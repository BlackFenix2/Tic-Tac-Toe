import { describe, expect, it } from 'vitest';
import {
  buildBoardFromMoveOrder,
  findCriticalMove,
  getWinner
} from '../../src/lib/gameRules';

describe('gameRules', () => {
  it('detects a winning line', () => {
    expect(getWinner(['X', '', '', 'X', '', '', 'X', '', ''])).toBe('X');
  });

  it('detects a draw when the board is full', () => {
    expect(getWinner(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'], 9)).toBe(
      'draw'
    );
  });

  it('returns null when the game is still in progress', () => {
    expect(getWinner(['X', '', '', '', 'O', '', '', '', ''], 2)).toBeNull();
  });

  it('finds the winning move for the current player', () => {
    expect(findCriticalMove(['X', 'X', '', '', '', '', '', '', ''], 'X')).toBe(
      2
    );
  });

  it('finds the blocking move against the opponent', () => {
    expect(findCriticalMove(['X', 'X', '', '', '', '', '', '', ''], 'O')).toBe(
      2
    );
  });

  it('rebuilds a board from move order', () => {
    expect(buildBoardFromMoveOrder([0, 4, 8])).toEqual([
      'X',
      '',
      '',
      '',
      'O',
      '',
      '',
      '',
      'X'
    ]);
  });
});
