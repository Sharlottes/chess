"use client";

import Image from "next/image";

import chessboardUrl from "@/_assets/images/chessboard.png";
import { Button, Spinner } from "@radix-ui/themes";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import useUserStore from "@/hooks/useUserStore";
import * as styles from "./page.css";
import { useShallow } from "zustand/react/shallow";
import stomp, { send } from "@/lib/stomp";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { GAME_TIME, TIME_ADD } from "@/_assets/constants/game";
import { Subscription } from "rxjs";

export default function App() {
  const pathname = usePathname();
  const router = useRouter();
  const [userData, logout] = useUserStore(
    useShallow((state) => [state.data, state.logout])
  );
  const { enqueueSnackbar } = useSnackbar();
  const [isMatchmaking, setIsMatchmaking] = useState(false);

  const findGameWatcherRef = useRef<Subscription>();
  useEffect(() => {
    if (!userData) return;

    if (findGameWatcherRef.current) {
      findGameWatcherRef.current?.unsubscribe();
    }
    findGameWatcherRef.current = stomp
      .watch({
        destination: `/sub/find-game/${userData.uid}`,
      })
      .subscribe((message) => {
        const data = JSON.parse(message.body) as FindGameSubscribe;

        console.log(
          `/sub/find-game/${userData.uid}, Received: ${message.body}`
        );
        switch (data.type) {
          case "game-found": {
            enqueueSnackbar(data.message, { variant: "success" });
            break;
          }
          case "game-start":
            sessionStorage.setItem("color", data.color);
            sessionStorage.setItem("opponent", JSON.stringify(data.opponent));
            setIsMatchmaking(false);
            router.push("/game");

            findGameWatcherRef.current?.unsubscribe();
            break;
          case "waiting":
            enqueueSnackbar(data.message, { variant: "warning" });
            break;
          case "error":
            enqueueSnackbar(data.message, { variant: "error" });
            setIsMatchmaking(false);
            break;
          case "fail":
            enqueueSnackbar(data.message, { variant: "error" });
            setIsMatchmaking(false);
            break;
        }
      });
  }, [userData]);
  const handleMatchmaking = () => {
    if (!userData) return;
    setIsMatchmaking(true);
    send("/pub/find-game", {
      uid: userData.uid,
      timeLeft: GAME_TIME,
      timeToAddEveryTurnStart: TIME_ADD,
    });
    console.log("send find-game from " + userData.uid);
  };

  return (
    <div className={styles.container}>
      <Image src={chessboardUrl} alt="" width={320} height={320} />
      <div>
        <h1 className={styles.title}>THE CHESS</h1>
        {userData ? (
          <>
            <Button
              disabled={isMatchmaking}
              color="blue"
              size="4"
              className={styles.button}
              onClick={handleMatchmaking}
            >
              <Spinner loading={isMatchmaking} />
              <p>시작하기</p>
            </Button>
            <Button
              color="cyan"
              size="4"
              className={styles.button}
              onClick={() => logout()}
            >
              로그아웃하기
            </Button>
          </>
        ) : (
          <>
            <Link href={`/login?redirect=${pathname}`}>
              <Button color="grass" size="4" className={styles.button}>
                로그인
              </Button>
            </Link>
            <Link href={`/signup?redirect=${pathname}`}>
              <Button color="green" size="4" className={styles.button}>
                회원가입
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
