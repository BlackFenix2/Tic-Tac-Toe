export type PlayerTurn = 'X' | 'O';
export type CellValue = '' | PlayerTurn;
export type BoardState = CellValue[];
export type Winner = PlayerTurn | 'draw' | null;

export const WINNING_LINES: number[][] = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
];

const getOpenSquare = (board: BoardState, squares: number[]): number | null => {
  for (const square of squares) {
    if (board[square] === '') {
      return square;
    }
  }

  return null;
};

export const getWinner = (
  board: BoardState,
  totalMoves: number = board.filter(square => square !== '').length
): Winner => {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const first = board[a];
    const second = board[b];
    const third = board[c];

    if (first === second && first === third && first !== '') {
      return first;
    }
  }

  if (totalMoves >= 9) {
    return 'draw';
  }

  return null;
};

export const findCriticalMove = (
  board: BoardState,
  turn: PlayerTurn
): number | null => {
  let xWin: number[] | undefined;
  let oWin: number[] | undefined;

  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const first = board[a];
    const second = board[b];
    const third = board[c];
    const populated = [first, second, third].filter(
      (value): value is PlayerTurn => value !== ''
    );

    if (populated.length !== 2) {
      continue;
    }

    if (new Set(populated).size !== 1) {
      continue;
    }

    if (populated[0] === 'X') {
      xWin = line;
    }

    if (populated[0] === 'O') {
      oWin = line;
    }
  }

  if (!xWin && !oWin) {
    return null;
  }

  if (turn === 'X' && xWin) {
    return getOpenSquare(board, xWin);
  }

  if (turn === 'O' && oWin) {
    return getOpenSquare(board, oWin);
  }

  if (turn === 'O' && xWin) {
    return getOpenSquare(board, xWin);
  }

  if (turn === 'X' && oWin) {
    return getOpenSquare(board, oWin);
  }

  return null;
};

export const buildBoardFromMoveOrder = (boardOrder: number[]): BoardState => {
  const board: BoardState = Array(9).fill('');

  boardOrder.forEach((square, index) => {
    board[square] = index % 2 === 0 ? 'X' : 'O';
  });

  return board;
};
