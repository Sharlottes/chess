"use client";

import { useReducer, useRef } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function Game() {
  const game = useRef(new Chess());
  const [, rerender] = useReducer((x) => x + 1, 0);

  function makeAMove(move: Parameters<Chess["move"]>[0]) {
    const result = game.current.move(move);
    rerender();
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function makeRandomMove() {
    const possibleMoves = game.current.moves();
    if (
      game.current.isGameOver() ||
      game.current.isDraw() ||
      possibleMoves.length === 0
    )
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
    });

    // illegal move
    if (move === null) return false;
    setTimeout(makeRandomMove, 200);
    return true;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            margin: "64px auto",
            maxWidth: "700px",
            maxHeight: "700px",
            flex: 1,
          }}
        >
          <Chessboard position={game.current.fen()} onPieceDrop={onDrop} />
        </div>
        <div></div>
      </div>
    </>
  );
}
