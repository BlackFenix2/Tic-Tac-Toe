import * as React from "react";
import Card from "./Card";

const options = [
  { key: "2", text: "2", value: 2 },
  { key: "1", text: "1", value: 1 },
  { key: "0", text: "Zero", value: 0 },
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
      <p className="text-sm font-semibold text-slate-200">Players?</p>
      <div className="flex flex-wrap items-center gap-2">
        <select
          onChange={props.changePlayer}
          disabled={props.disabled}
          defaultValue={2}
          className="min-w-22 rounded-md border border-slate-500/70 bg-slate-800/80 px-2 py-1 text-slate-100"
        >
          {options.map((option) => (
            <option key={option.key} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <button
          onClick={props.resetGame}
          disabled={props.disabled}
          className="rounded-md border border-cyan-200/80 bg-cyan-700 px-3 py-1 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-cyan-900 disabled:text-slate-200"
        >
          RESET
        </button>
        <input
          value={props.delay}
          onChange={props.setDelay}
          type="range"
          min={100}
          max={1000}
          className="min-w-35 flex-1"
        />
        <span className="text-sm font-semibold text-slate-200">
          {props.delay}
        </span>
      </div>
      {props.playerCount === 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={props.playSelf}
            disabled={props.disabled}
            className="rounded-md border border-pink-200/80 bg-pink-700 px-3 py-1 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-pink-900 disabled:text-slate-200"
          >
            Play itself
          </button>
          <button
            onClick={props.playSelfOnce}
            disabled={props.disabled}
            className="rounded-md border border-indigo-200/80 bg-indigo-700 px-3 py-1 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-900 disabled:text-slate-200"
          >
            Play self once
          </button>
        </div>
      )}
      <label className="flex items-center gap-2 text-sm text-slate-200">
        <input
          type="checkbox"
          checked={!props.muted}
          onChange={props.toggleSound}
        />
        Sound {props.muted ? "off" : "on"}
      </label>
    </div>
  </Card>
);

export default Options;
