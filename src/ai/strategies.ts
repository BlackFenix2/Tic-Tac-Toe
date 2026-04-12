import {
  findCriticalMove,
  type BoardState,
  type PlayerTurn
} from '../lib/gameRules';

export interface LearnedGameRecord {
  winner: string;
  totalMoves: number;
  boxOrder: number[];
}

export type StrategyCounterKey =
  | 'acrossSpecialCheck'
  | 'acrossPatternCheck'
  | 'diagPatternCheck'
  | 'randomCheck';

export interface ClassicMoveResult {
  move: number;
  counterKey?: StrategyCounterKey;
}

export interface ClassicStrategyInput {
  board: BoardState;
  totalMoves: number;
  turn: PlayerTurn;
}

const randomFrom = (values: number[]): number => {
  return values[Math.floor(Math.random() * values.length)];
};

export const pickRandomAvailable = (
  board: BoardState,
  candidates?: number[]
): number => {
  const pool = (candidates ?? board.map((_, index) => index)).filter(
    square => board[square] === ''
  );

  if (pool.length === 0) {
    throw new Error('No available moves remaining');
  }

  return randomFrom(pool);
};

export const pickLearningMove = (
  board: BoardState,
  turn: PlayerTurn,
  totalMoves: number,
  stats: LearnedGameRecord[]
): number => {
  const winningMoves = stats.filter(
    game => game.winner === turn || game.winner === 'draw'
  );

  if (winningMoves.length > 0) {
    const bestGame = winningMoves.reduce((best, game) =>
      game.totalMoves < best.totalMoves ? game : best
    );
    const learnedMove = bestGame.boxOrder[totalMoves];

    if (learnedMove !== undefined && board[learnedMove] === '') {
      return learnedMove;
    }
  }

  return pickRandomAvailable(board);
};

export const pickClassicMove = ({
  board,
  totalMoves,
  turn
}: ClassicStrategyInput): ClassicMoveResult => {
  if (totalMoves === 0) {
    return { move: Math.floor(Math.random() * 9) };
  }

  if (totalMoves === 1) {
    const diag = [0, 2, 6, 8];
    const acrossCheck = (board[1] === board[3]) === (board[5] === board[7]);
    const diagCheck = (board[0] === board[2]) === (board[6] === board[8]);

    if (!diagCheck) {
      return { move: 4 };
    }

    if (!acrossCheck) {
      if (board[5] !== board[3]) {
        return { move: pickRandomAvailable(board, [5, 3]) };
      }

      return { move: pickRandomAvailable(board, [1, 7]) };
    }

    return { move: randomFrom(diag) };
  }

  const criticalMove = findCriticalMove(board, turn);

  if (criticalMove !== null) {
    return { move: criticalMove };
  }

  if (totalMoves === 3) {
    const pattern = board[4] === 'O' ? [1, 3, 5, 7] : [0, 2, 6, 8];

    if (board[1] === board[3] && board[1] && board[3]) {
      return { move: 0 };
    }

    if (board[1] === board[5] && board[1] && board[5]) {
      return { move: 2 };
    }

    if (board[7] === board[3] && board[7] && board[3]) {
      return { move: 6 };
    }

    if (board[7] === board[5] && board[7] && board[5]) {
      return { move: 8 };
    }

    if (board[1] !== board[7] || board[3] !== board[5]) {
      if (
        board[1] === board[6] &&
        board[2] === board[3] &&
        ((board[1] && board[6]) || (board[2] && board[3]))
      ) {
        return { move: 0 };
      }

      if (
        board[0] === board[5] &&
        board[1] === board[8] &&
        ((board[0] && board[5]) || (board[1] && board[8]))
      ) {
        return { move: 2 };
      }

      if (
        board[0] === board[7] &&
        board[3] === board[8] &&
        ((board[0] && board[7]) || (board[3] && board[8]))
      ) {
        return { move: 6 };
      }

      if (
        board[2] === board[7] &&
        board[5] === board[6] &&
        ((board[2] && board[7]) || (board[5] && board[6]))
      ) {
        return { move: 8 };
      }

      return {
        move: pickRandomAvailable(board, [0, 2, 6, 8]),
        counterKey: 'acrossSpecialCheck'
      };
    }

    return {
      move: pickRandomAvailable(board, pattern),
      counterKey: 'acrossPatternCheck'
    };
  }

  if (!(board[0] && board[2] && board[6] && board[8])) {
    return {
      move:
        totalMoves === 5 && board[4] === ''
          ? 4
          : pickRandomAvailable(board, [0, 2, 6, 8]),
      counterKey: 'diagPatternCheck'
    };
  }

  return {
    move: pickRandomAvailable(board),
    counterKey: 'randomCheck'
  };
};
