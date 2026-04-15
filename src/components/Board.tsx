import * as React from "react";
import { WINNING_LINES, type Winner } from "../lib/gameRules";

interface BoardProps {
  clicked: (e: React.MouseEvent<HTMLButtonElement>) => void;
  gameBoard: string[];
  selectedBox?: number;
  winner?: Winner | undefined;
}

const SQUARE_IDS = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

const WIN_LINE_STYLE: Record<string, React.CSSProperties> = {
  "0-1-2": { top: "16.66%", left: "12%", width: "76%", height: "4px" },
  "3-4-5": { top: "50%", left: "12%", width: "76%", height: "4px" },
  "6-7-8": { top: "83.33%", left: "12%", width: "76%", height: "4px" },
  "0-3-6": { top: "12%", left: "16.66%", width: "4px", height: "76%" },
  "1-4-7": { top: "12%", left: "50%", width: "4px", height: "76%" },
  "2-5-8": { top: "12%", left: "83.33%", width: "4px", height: "76%" },
  "0-4-8": {
    top: "50%",
    left: "50%",
    width: "106%",
    height: "4px",
    transform: "translate(-50%, -50%) rotate(45deg)",
    transformOrigin: "center",
  },
  "2-4-6": {
    top: "50%",
    left: "50%",
    width: "106%",
    height: "4px",
    transform: "translate(-50%, -50%) rotate(-45deg)",
    transformOrigin: "center",
  },
};

interface MarkProps {
  value: string;
  animate: boolean;
}

const Mark = ({ value, animate }: MarkProps) => {
  if (value === "") {
    return null;
  }

  if (value === "X") {
    return (
      <svg
        viewBox="0 0 100 100"
        className="ttt-mark-svg ttt-mark-x"
        aria-hidden="true"
      >
        <line
          x1="22"
          y1="22"
          x2="78"
          y2="78"
          className={`ttt-mark-stroke ${animate ? "ttt-mark-stroke-draw" : ""}`}
        />
        <line
          x1="78"
          y1="22"
          x2="22"
          y2="78"
          className={`ttt-mark-stroke ${animate ? "ttt-mark-stroke-draw ttt-mark-stroke-delay" : ""}`}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className="ttt-mark-svg ttt-mark-o"
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="31"
        className={`ttt-mark-stroke ${animate ? "ttt-mark-stroke-draw" : ""}`}
      />
    </svg>
  );
};

const getWinningLineKey = (board: string[], winner?: Winner | undefined) => {
  if (winner !== "X" && winner !== "O") {
    return null;
  }

  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] === winner && board[b] === winner && board[c] === winner) {
      return line.join("-");
    }
  }

  return null;
};

const Board = (props: BoardProps) => {
  const winningLineKey = getWinningLineKey(props.gameBoard, props.winner);

  return (
    <div className="mx-auto w-full max-w-125">
      <div className="ttt-board-shell relative rounded-[28px] p-3 sm:p-4">
        <div className="grid aspect-square w-full grid-cols-3 grid-rows-3 gap-2 sm:gap-3">
      {props.gameBoard.map((value: string, i: number) => (
        <button
          key={SQUARE_IDS[i]}
          type="button"
          data-square={i}
          aria-label={`Square ${i + 1}${value ? ` ${value}` : " empty"}`}
          onClick={props.clicked}
          className={`ttt-glass-cell relative flex select-none items-center justify-center rounded-2xl transition duration-300 ease-out hover:-translate-y-0.5 hover:brightness-105 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cyan-300 ${
            props.selectedBox === i ? "ttt-tile-focus" : ""
          }`}
        >
          <Mark value={value} animate={props.selectedBox === i} />
        </button>
      ))}
        </div>
        {winningLineKey && (
          <div
            className="ttt-win-line"
            style={WIN_LINE_STYLE[winningLineKey]}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
};

export default Board;
