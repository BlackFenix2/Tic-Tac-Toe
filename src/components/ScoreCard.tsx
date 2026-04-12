import * as React from 'react';
import Card from './Card';

interface Props {
  clearScore: () => void;
  stats: Array<{
    winner: string;
    gameNumber?: number;
    totalMoves: number;
    boxOrder: number[];
    scoreClicked?: (boardOrder: number[]) => void;
  }>;
}

interface State {
  active: string;
  filteredList: Props['stats'];
}

class ScoreCard extends React.Component<Props, State> {
  // default active state
  public state = {
    active: 'Total Games',
    filteredList: this.props.stats
  };

  public filterList = (stats: Props['stats'], content: string) => {
    if (content === 'Total Games') {
      return stats;
    }
    if (content === 'Draws') {
      return stats.filter(x => x.winner === 'draw');
    }
    if (content === 'X Wins') {
      return stats.filter(x => x.winner === 'X');
    }
    if (content === 'O Wins') {
      return stats.filter(x => x.winner === 'O');
    }
    return stats;
  };

  public activeChange = (_e: unknown, { content }: { content: string }) => {
    const stats = Array.isArray(this.props.stats) ? this.props.stats : [];
    const list = this.filterList(stats, content);
    this.setState({
      active: content,
      filteredList: list
    });
  };

  public render() {
    const stats = Array.isArray(this.props.stats) ? this.props.stats : [];
    const activeList = this.filterList(stats, this.state.active) || [];

    return (
      <Card>
        <div className="space-y-3 p-3 text-center">
          <h2 className="text-2xl font-semibold">Score Card</h2>
          <button
            onClick={this.props.clearScore}
            className="border border-slate-700 bg-slate-800 px-3 py-1 text-sm font-semibold text-white"
          >
            CLEAR SCORE
          </button>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              className={`border px-3 py-1 text-sm ${
                this.state.active === 'Total Games'
                  ? 'bg-slate-800 text-white'
                  : 'bg-white'
              }`}
              onClick={() =>
                this.activeChange(null, { content: 'Total Games' })
              }
            >
              TOTAL GAMES {stats.length || 0}
            </button>
            <button
              className={`border px-3 py-1 text-sm ${
                this.state.active === 'Draws'
                  ? 'bg-slate-800 text-white'
                  : 'bg-white'
              }`}
              onClick={() => this.activeChange(null, { content: 'Draws' })}
            >
              DRAWS {stats.filter(x => x.winner === 'draw').length || 0}
            </button>
            <button
              className={`border px-3 py-1 text-sm ${
                this.state.active === 'X Wins'
                  ? 'bg-slate-800 text-white'
                  : 'bg-white'
              }`}
              onClick={() => this.activeChange(null, { content: 'X Wins' })}
            >
              X WINS {stats.filter(x => x.winner === 'X').length || 0}
            </button>
            <button
              className={`border px-3 py-1 text-sm ${
                this.state.active === 'O Wins'
                  ? 'bg-slate-800 text-white'
                  : 'bg-white'
              }`}
              onClick={() => this.activeChange(null, { content: 'O Wins' })}
            >
              O WINS {stats.filter(x => x.winner === 'O').length || 0}
            </button>
          </div>
        </div>

        <ul className="grid list-none gap-2 px-3 pb-3 pt-1">
          {activeList.map((item, index) => (
            <li key={index}>
              <ScoreCardItem {...item} gameNumber={index + 1} />
            </li>
          ))}
        </ul>

        <div className="p-3 text-center">
          <button
            onClick={this.props.clearScore}
            className="border border-slate-700 bg-slate-800 px-3 py-1 text-sm font-semibold text-white"
          >
            CLEAR SCORE
          </button>
        </div>
      </Card>
    );
  }
}

interface ScoreCardItemProps {
  gameNumber: number;
  totalMoves: number;
  boxOrder: number[];
  winner: string;
  scoreClicked?: (boardOrder: number[]) => void;
}

const ScoreCardItem = (props: ScoreCardItemProps) => (
  <div className="space-y-1 border border-slate-300 bg-slate-50 p-2 text-sm">
    <div>Game: {props.gameNumber}</div>
    <div>Total Moves: {props.totalMoves}</div>
    <div>Board Order: {props.boxOrder}</div>
    <div>Winner: {props.winner}</div>
    {props.scoreClicked && (
      <button
        onClick={() => props.scoreClicked?.(props.boxOrder)}
        className="border border-slate-700 bg-slate-700 px-2 py-1 text-xs text-white"
      >
        board
      </button>
    )}
  </div>
);

export default ScoreCard;
