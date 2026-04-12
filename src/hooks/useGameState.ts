import { useCallback, useRef, useState } from 'react';
import { playCircle, playCross, playGame } from '../Sounds';
import {
  type LearnedGameRecord,
  type StrategyCounterKey
} from '../ai/strategies';
import {
  buildBoardFromMoveOrder,
  getWinner,
  type BoardState,
  type PlayerTurn,
  type Winner
} from '../lib/gameRules';

export type { StrategyCounterKey };

export interface GameStats extends LearnedGameRecord {
  scoreClicked?: (boardOrder: number[]) => void;
}

export interface GameState {
  turn: PlayerTurn;
  board: BoardState;
  totalMoves: number;
  gameEnded: boolean;
  gameLocked: boolean;
  winner: Winner | undefined;
  numOfPlayers: number;
  warGamesCount: number;
  warGamesDelay: number;
  selectedBox: number | undefined;
  stats: GameStats[];
  boxOrder: number[];
  diagPatternCheck: number;
  acrossPatternCheck: number;
  acrossSpecialCheck: number;
  randomCheck: number;
  machineLearning: boolean;
  delay: number;
}

const createInitialState = (): GameState => ({
  turn: 'X',
  board: Array(9).fill('') as BoardState,
  totalMoves: 0,
  gameEnded: false,
  gameLocked: false,
  winner: undefined,
  numOfPlayers: 2,
  warGamesCount: 40,
  warGamesDelay: 1000,
  selectedBox: undefined,
  stats: [],
  boxOrder: [],
  diagPatternCheck: 0,
  acrossPatternCheck: 0,
  acrossSpecialCheck: 0,
  randomCheck: 0,
  machineLearning: false,
  delay: 1000
});

type StatePatch =
  | Partial<GameState>
  | ((previousState: GameState) => Partial<GameState>);

export const useGameState = () => {
  const [state, setState] = useState<GameState>(() => createInitialState());
  const stateRef = useRef<GameState>(state);

  const updateState = useCallback((patch: StatePatch) => {
    const previousState = stateRef.current;
    const nextPatch = typeof patch === 'function' ? patch(previousState) : patch;
    const nextState = {
      ...previousState,
      ...nextPatch
    };

    stateRef.current = nextState;
    setState(nextState);

    return nextState;
  }, []);

  const scoreClicked = useCallback(
    (boardOrder: number[]) => {
      updateState({
        board: buildBoardFromMoveOrder(boardOrder),
        boxOrder: boardOrder
      });
    },
    [updateState]
  );

  const startTurn = useCallback(
    async (loc: number) => {
      const currentState = stateRef.current;

      if (currentState.board[loc] !== '') {
        throw new Error(
          `Turn Error: Player ${currentState.turn} attempted to fill a non-empty slot: ${loc}`
        );
      }

      if (currentState.turn === 'X') {
        playCross();
      } else {
        playCircle();
      }

      const nextBoard = [...currentState.board] as BoardState;
      nextBoard[loc] = currentState.turn;
      const nextTotalMoves = currentState.totalMoves + 1;
      const nextBoxOrder = [...currentState.boxOrder, loc];
      const nextWinner = getWinner(nextBoard, nextTotalMoves);

      updateState({
        turn: currentState.turn === 'O' ? 'X' : 'O',
        board: nextBoard,
        totalMoves: nextTotalMoves,
        selectedBox: loc,
        boxOrder: nextBoxOrder,
        gameEnded: Boolean(nextWinner),
        winner: nextWinner ?? undefined,
        stats: nextWinner
          ? [
              ...currentState.stats,
              {
                winner: nextWinner,
                totalMoves: nextTotalMoves,
                boxOrder: nextBoxOrder,
                scoreClicked
              }
            ]
          : currentState.stats
      });

      return true;
    },
    [scoreClicked, updateState]
  );

  const reset = useCallback(
    (delay?: number) => {
      updateState(previousState => ({
        turn: 'X',
        board: Array(9).fill('') as BoardState,
        totalMoves: 0,
        gameEnded: false,
        gameLocked: false,
        winner: undefined,
        warGamesDelay: delay ?? previousState.warGamesDelay,
        selectedBox: undefined,
        boxOrder: []
      }));
      playGame();
    },
    [updateState]
  );

  const clearScore = useCallback(() => {
    updateState({
      stats: []
    });
  }, [updateState]);

  const setGameLocked = useCallback(
    (gameLocked: boolean) => {
      updateState({ gameLocked });
    },
    [updateState]
  );

  const setNumOfPlayers = useCallback(
    (numOfPlayers: number) => {
      reset();
      updateState({ numOfPlayers });
    },
    [reset, updateState]
  );

  const setDelay = useCallback(
    (delay: number) => {
      updateState({ delay });
    },
    [updateState]
  );

  const setWarGamesDelay = useCallback(
    (warGamesDelay: number) => {
      updateState({ warGamesDelay });
    },
    [updateState]
  );

  const bumpStrategyCounter = useCallback(
    (counterKey: StrategyCounterKey) => {
      updateState(previousState => ({
        [counterKey]: previousState[counterKey] + 1
      } as Pick<GameState, StrategyCounterKey>));
    },
    [updateState]
  );

  const toggleMachineLearning = useCallback(() => {
    updateState(previousState => ({
      machineLearning: !previousState.machineLearning
    }));
  }, [updateState]);

  const getState = useCallback(() => stateRef.current, []);

  return {
    state,
    getState,
    startTurn,
    reset,
    clearScore,
    scoreClicked,
    setGameLocked,
    setNumOfPlayers,
    setDelay,
    setWarGamesDelay,
    bumpStrategyCounter,
    toggleMachineLearning
  };
};
