import { describe, expect, it } from 'vitest';
import {
  pickClassicMove,
  pickLearningMove,
  pickRandomAvailable
} from '../../src/ai/strategies';

describe('strategies', () => {
  it('picks the only available square', () => {
    expect(
      pickRandomAvailable(['X', 'O', 'X', 'O', 'X', 'O', 'O', '', 'X'])
    ).toBe(7);
  });

  it('uses the learned move when a matching game exists', () => {
    expect(
      pickLearningMove(['X', '', '', '', '', '', '', '', ''], 'O', 1, [
        {
          winner: 'O',
          totalMoves: 5,
          boxOrder: [0, 4, 1, 8, 2]
        }
      ])
    ).toBe(4);
  });

  it('falls back to the only open square when the learned move is unavailable', () => {
    expect(
      pickLearningMove(['X', 'O', 'X', 'O', 'X', 'O', 'O', '', 'X'], 'O', 1, [
        {
          winner: 'O',
          totalMoves: 5,
          boxOrder: [0, 1, 2, 3, 4]
        }
      ])
    ).toBe(7);
  });

  it('opens in the center when the first move creates a diagonal threat shape', () => {
    expect(
      pickClassicMove({
        board: ['X', '', '', '', '', '', '', '', ''],
        totalMoves: 1,
        turn: 'O'
      })
    ).toEqual({ move: 4 });
  });

  it('blocks a critical opponent move before pattern logic', () => {
    expect(
      pickClassicMove({
        board: ['X', 'X', '', '', 'O', '', '', '', ''],
        totalMoves: 3,
        turn: 'O'
      })
    ).toEqual({ move: 2 });
  });

  it('uses the random fallback counter when only one non-corner square remains', () => {
    expect(
      pickClassicMove({
        board: ['X', 'O', 'X', 'O', 'X', '', 'O', 'X', 'O'],
        totalMoves: 8,
        turn: 'X'
      })
    ).toEqual({ move: 5, counterKey: 'randomCheck' });
  });
});
