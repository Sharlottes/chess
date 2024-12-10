"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";

import useUserStore from "@/hooks/useUserStore";
import withAuth from "@/components/Dialog/hoc/withAuth";
import stomp, { send } from "@/lib/stomp";
import { useSnackbar } from "notistack";

import * as styles from "./page.css";
import { overlay } from "overlay-kit";
import Dialog from "@/components/Dialog";
import { useRouter } from "next/navigation";

const TIME_LEFT = 30 * 60 * 1000;

function Game() {
  const game = useRef(new Chess());
  const [, rerender] = useReducer((x) => x + 1, 0);
  const userData = useUserStore((state) => state.data);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const oppoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [oppoTimeLeft, setOppoTimeLeft] = useState(TIME_LEFT);
  const [timeLeft, setTimeLeft] = useState(TIME_LEFT);

  const [color, setColor] = useState<"white" | "black">("white");
  const [opponent, setOpponent] = useState<{
    nickname: string;
    record: {
      wins: number;
      losses: number;
      draws: number;
    };
  } | null>(null);

  if (!userData) return;

  useEffect(() => {
    const color = sessionStorage.getItem("color") as "white" | "black";
    setColor(color);
    const opponent = JSON.parse(sessionStorage.getItem("opponent")!);
    setOpponent(opponent);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (oppoTimeoutRef.current) clearTimeout(oppoTimeoutRef.current);
    if (color == "white") {
      timeoutRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 100);
      }, 100);
    } else {
      oppoTimeoutRef.current = setInterval(() => {
        setOppoTimeLeft((prev) => prev - 100);
      }, 100);
    }
    stomp.watch(`/sub/move/${userData.uid}`).subscribe((message) => {
      const data = JSON.parse(message.body) as MoveSubscribe;

      switch (data.type) {
        case "success":
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          if (oppoTimeoutRef.current) clearTimeout(oppoTimeoutRef.current);

          setTimeLeft(data.timeLeft);
          setOppoTimeLeft(data.timeLeftOpponent);
          if (data.turn == color.toUpperCase()) {
            timeoutRef.current = setInterval(() => {
              setTimeLeft((prev) => prev - 100);
            }, 100);
          } else {
            oppoTimeoutRef.current = setInterval(() => {
              setOppoTimeLeft((prev) => prev - 100);
            }, 100);
          }
          console.log(`/sub/move/${userData.uid}, Received: ${message.body}`);
          game.current.load(data.fen);
          rerender();
          break;
        case "not-your-turn":
          enqueueSnackbar(data.message, { variant: "warning" });
          break;
        case "error":
          enqueueSnackbar(data.message, { variant: "error" });
          break;
        case "checked":
          enqueueSnackbar(data.message, { variant: "info" });
          break;
        case "invalid-move":
          enqueueSnackbar(data.message, { variant: "warning" });
          break;
      }
    });
    stomp.watch(`/sub/game-over/${userData.uid}`).subscribe((message) => {
      const data = JSON.parse(message.body) as GameOverSubscribe;

      console.log(`/sub/game-over/${userData.uid}, Received: ${message.body}`);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (oppoTimeoutRef.current) clearTimeout(oppoTimeoutRef.current);
      overlay.open(({ isOpen, close }) => (
        <Dialog
          open={isOpen}
          onClose={() => {
            router.push("/");
            close();
          }}
        >
          <div>
            <h1>{data.message}</h1>
            <h2>{data.gameResult.toUpperCase()}</h2>
            <p>승: {data.record.wins}</p>
            <p>패: {data.record.losses}</p>
            <p>무: {data.record.draws}</p>
          </div>
        </Dialog>
      ));
      stomp.deactivate();
    });

    rerender();
  }, []);

  function makeAMove(move: { from: Square; to: Square; promotion?: string }) {
    const piece = game.current.get(move.from);

    // ! 프로모션 없이 끝에 도달하면 안됨
    if (
      piece.type === "p" &&
      !move.promotion &&
      (move.to.endsWith("8") || move.to.endsWith("1"))
    ) {
      return false;
    }

    if (piece.color !== color[0]) {
      enqueueSnackbar("자신의 말만 움직일 수 있습니다!", {
        variant: "warning",
      });
      return false;
    }
    console.log(move);

    let result = null;
    try {
      result = game.current.move(move, { strict: true });
      game.current.undo();
    } catch (e) {
      console.error(e);
      enqueueSnackbar("그건 올바르지 않은 수 입니다!", { variant: "error" });
    }
    if (result === null) return false;
    send("/pub/move", {
      uid: userData!.uid,
      move: result.lan,
    });
    return true;
  }

  return (
    <div className={styles.container}>
      <div className={styles.chessboard}>
        <Chessboard
          position={game.current.fen()}
          boardOrientation={color}
          onPromotionPieceSelect={(promotion, from, to) => {
            if (promotion && from && to)
              return makeAMove({
                from,
                to,
                promotion: promotion[1].toLowerCase(),
              });
            return false;
          }}
          onPieceDrop={(from, to) => makeAMove({ from, to })}
        />
      </div>
      <div className={styles.side}>
        <h1 style={{ color: color === "white" ? "black" : "white" }}>
          {opponent?.nickname}
        </h1>
        <p>{formatDate(new Date(oppoTimeLeft))}</p>
        <h2 style={{ margin: "16px 0" }}>vs</h2>
        <h1 style={{ color }}>{userData.nickname}</h1>
        <p>{formatDate(new Date(timeLeft))}</p>
      </div>
    </div>
  );
}

export default withAuth(Game, "user");

function formatDate(date: Date) {
  return `${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
}
