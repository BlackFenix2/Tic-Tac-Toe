import * as React from 'react';
import Card from './Card';

const options = [
  { key: '2', text: '2', value: 2 },
  { key: '1', text: '1', value: 1 },
  { key: '0', text: 'Zero', value: 0 }
];

interface OptionsProps {
  changePlayer: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  resetGame: () => void;
  disabled: boolean;
  playSelf: () => void;
  playSelfOnce: () => void;
  playerCount: number;
  toggleSound: () => void;
  muted: boolean;
  setDelay: (e: React.ChangeEvent<HTMLInputElement>) => void;
  delay: number;
}

const Options = (props: OptionsProps) => (
  <Card>
    <div className="space-y-3 p-3">
      <h2 className="text-center text-2xl font-semibold">Options</h2>
      <p className="text-sm font-semibold">Players?</p>
      <div className="flex flex-wrap items-center gap-2">
        <select
          onChange={props.changePlayer}
          disabled={props.disabled}
          defaultValue={2}
          className="min-w-[88px] border border-slate-400 bg-white px-2 py-1"
        >
          {options.map(option => (
            <option key={option.key} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <button
          onClick={props.resetGame}
          disabled={props.disabled}
          className="border border-slate-700 bg-slate-800 px-3 py-1 text-sm font-semibold text-white disabled:opacity-50"
        >
          RESET
        </button>
        <input
          value={props.delay}
          onChange={props.setDelay}
          type="range"
          min={100}
          max={1000}
          className="min-w-[140px] flex-1"
        />
        <span className="text-sm font-semibold">{props.delay}</span>
      </div>
      {props.playerCount === 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={props.playSelf}
            disabled={props.disabled}
            className="border border-slate-700 bg-slate-700 px-3 py-1 text-sm text-white disabled:opacity-50"
          >
            Play itself
          </button>
          <button
            onClick={props.playSelfOnce}
            disabled={props.disabled}
            className="border border-slate-700 bg-slate-600 px-3 py-1 text-sm text-white disabled:opacity-50"
          >
            Play self once
          </button>
        </div>
      )}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!props.muted}
          onChange={props.toggleSound}
        />
        Sound {props.muted ? 'off' : 'on'}
      </label>
    </div>
  </Card>
);

export default Options;
