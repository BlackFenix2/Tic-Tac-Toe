import * as React from 'react';
import Card from './Card';

interface DebugProps {
  numOfPlayers: number;
  turn: string;
  selectedBox: number | undefined;
  diagPatternCheck: number;
  acrossPatternCheck: number;
  acrossSpecialCheck: number;
  randomCheck: number;
  totalMoves: number;
  boxOrder: number[];
  gameEnded: boolean;
  winner: string | null | undefined;
  gameLocked: boolean;
  warGamesDelay: number;
  [key: string]: unknown;
}

const Debug = (props: DebugProps) => (
  <Card>
    <div className="space-y-1 p-3 text-sm">
      <p className="mb-2 text-lg font-semibold">Stats:</p>
      <p>Players: {props.numOfPlayers}</p>
      <p>Turn: {props.turn}</p>
      <p>Previous move: {String(props.selectedBox)}</p>
      <p>Diag Check Used: {String(props.diagPatternCheck)}</p>
      <p>Across Check Used: {String(props.acrossPatternCheck)}</p>
      <p>Special Check Used: {String(props.acrossSpecialCheck)}</p>
      <p>Random Check Used: {String(props.randomCheck)}</p>
      <p>Total Moves: {props.totalMoves}</p>
      <p>Board Order: {props.boxOrder}</p>
      <p>Game Ended: {String(props.gameEnded)}</p>
      <p>Winner: {String(props.winner)}</p>
      <p>Locked: {String(props.gameLocked)}</p>
      <p>Delay: {String(props.warGamesDelay)}</p>
    </div>
  </Card>
);

export default Debug;
