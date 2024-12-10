interface CommonUser {
  nickname: string;
  record: { wins: number; losses: number; draws: number };
}

type FindGamePublish = {
  uid: number;
  timeLeft: number;
  timeToAddEveryTurnStart: number;
};

type FindGameSubscribe =
  | {
      type: "game-found" | "waiting" | "error" | "fail";
      message: string;
    }
  | {
      type: "game-start";
      message: string;
      color: "white" | "black";
      opponent: CommonUser;
    };

type MovePublish = {
  uid: number;
  move: string;
};

type MoveSubscribe =
  | {
      type: "not-your-turn" | "error" | "checked" | "invalid-move";
      message: string;
    }
  | {
      type: "success";
      message: string;
      fen: string;
      move: string;
      turn: "BLACK" | "WHITE";
      timeLeft: number;
      timeLeftOpponent: number;
    };

type GameOverSubscribe = {
  message: string;
  gameResult: "win" | "lose" | "draw";
  type: "timeover" | "checkmate" | "surrender" | "stalemate";
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
};
