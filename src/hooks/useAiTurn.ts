import { useCallback } from 'react';
import { pickClassicMove, pickLearningMove } from '../ai/strategies';
import type { GameState, StrategyCounterKey } from './useGameState';

interface UseAiTurnOptions {
  getState: () => GameState;
  startTurn: (loc: number) => Promise<boolean>;
  reset: (delay?: number) => void;
  setGameLocked: (gameLocked: boolean) => void;
  setWarGamesDelay: (warGamesDelay: number) => void;
  bumpStrategyCounter: (counterKey: StrategyCounterKey) => void;
}

const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export const useAiTurn = ({
  getState,
  startTurn,
  reset,
  setGameLocked,
  setWarGamesDelay,
  bumpStrategyCounter
}: UseAiTurnOptions) => {
  const aiTurn = useCallback(
    async (players: number) => {
      if (players > 0) {
        await sleep(1000);
      }

      const state = getState();
      if (state.gameEnded) {
        return;
      }

      const move = pickLearningMove(
        state.board,
        state.turn,
        state.totalMoves,
        state.stats
      );

      await startTurn(move);
    },
    [getState, startTurn]
  );

  const oldCpuTurn = useCallback(
    async (players: number) => {
      if (players > 0) {
        await sleep(1000);
      }

      const state = getState();
      if (state.gameEnded) {
        return;
      }

      const { move, counterKey } = pickClassicMove({
        board: state.board,
        totalMoves: state.totalMoves,
        turn: state.turn
      });

      await startTurn(move);

      if (counterKey) {
        bumpStrategyCounter(counterKey);
      }
    },
    [bumpStrategyCounter, getState, startTurn]
  );

  const cpuTurn = useCallback(
    async (players: number) => {
      const state = getState();

      if (state.machineLearning) {
        await aiTurn(players);
        return;
      }

      await oldCpuTurn(players);
    },
    [aiTurn, getState, oldCpuTurn]
  );

  const playSelfOnce = useCallback(async () => {
    reset();
    setGameLocked(true);

    do {
      await sleep(getState().delay);
      await cpuTurn(getState().numOfPlayers);
    } while (!getState().gameEnded);

    setGameLocked(false);
  }, [cpuTurn, getState, reset, setGameLocked]);

  const playSelf = useCallback(async () => {
    const state = getState();

    if (
      confirm(
        `Warning: The computer will play itself for ${state.warGamesCount} games`
      )
    ) {
      return;
    }

    reset();
    setGameLocked(true);

    for (let index = 0; index < getState().warGamesCount; index += 1) {
      do {
        await sleep(getState().warGamesDelay);
        await cpuTurn(getState().numOfPlayers);
      } while (!getState().gameEnded);

      const currentDelay = getState().warGamesDelay;
      const nextDelay = currentDelay - 100 >= 100 ? currentDelay - 100 : 50;

      setWarGamesDelay(nextDelay);
      reset(nextDelay);
    }

    setGameLocked(false);
    reset();
  }, [cpuTurn, getState, reset, setGameLocked, setWarGamesDelay]);

  return {
    aiTurn,
    oldCpuTurn,
    cpuTurn,
    playSelfOnce,
    playSelf
  };
};
