import * as React from "react";
import Board from "./components/Board";
import Debug from "./components/Debug";
import Options from "./components/Options";
import ScoreCard from "./components/ScoreCard";
import { useAiTurn } from "./hooks/useAiTurn";
import { useGameState } from "./hooks/useGameState";
import { useSound } from "./hooks/useSound";
import Card from "./components/Card";

const TicTacToe = () => {
  const {
    state,
    getState,
    startTurn,
    reset,
    clearScore,
    setGameLocked,
    setNumOfPlayers,
    setDelay,
    setWarGamesDelay,
    bumpStrategyCounter,
  } = useGameState();
  const { muted, toggleSound } = useSound();
  const { cpuTurn, playSelf, playSelfOnce } = useAiTurn({
    getState,
    startTurn,
    reset,
    setGameLocked,
    setWarGamesDelay,
    bumpStrategyCounter,
  });

  const boxClicked = React.useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget;
      const currentState = getState();

      if (
        currentState.gameEnded ||
        currentState.gameLocked ||
        currentState.numOfPlayers === 0 ||
        target.textContent !== ""
      ) {
        return;
      }

      const correctInput = await startTurn(
        parseInt(target.dataset.square ?? "0", 10),
      );
      const afterMoveState = getState();

      if (
        afterMoveState.numOfPlayers <= 1 &&
        !afterMoveState.gameEnded &&
        correctInput
      ) {
        setGameLocked(true);
        await cpuTurn(afterMoveState.numOfPlayers);
        setGameLocked(false);
      }
    },
    [cpuTurn, getState, setGameLocked, startTurn],
  );

  const changePlayer = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setNumOfPlayers(Number(e.target.value));
    },
    [setNumOfPlayers],
  );

  const changeDelay = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDelay(Number(e.target.value));
    },
    [setDelay],
  );

  return (
    <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[1fr_1.15fr_1fr]">
      <div className="min-w-0">
        <Options
          changePlayer={changePlayer}
          resetGame={reset}
          disabled={state.gameLocked}
          playSelf={playSelf}
          playSelfOnce={playSelfOnce}
          playerCount={state.numOfPlayers}
          toggleSound={toggleSound}
          muted={muted}
          setDelay={changeDelay}
          delay={state.delay}
        />
        <div className="h-3" />
        <ScoreCard stats={state.stats} clearScore={clearScore} />
      </div>
      <div className="min-w-0">
        <Card className="mx-auto w-full max-w-140">
          <div className="p-3 text-center">
            <h2 className="mb-3 text-2xl font-semibold">Tic-Tac-Toe</h2>
            <Board
              clicked={boxClicked}
              gameBoard={state.board}
              selectedBox={state.selectedBox}
              winner={state.winner}
            />
          </div>
        </Card>
      </div>
      <div className="min-w-0">
        <Debug {...state} />
      </div>
    </div>
  );
};

export default TicTacToe;
