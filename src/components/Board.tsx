import * as React from 'react';

interface BoardProps {
  clicked: (e: React.MouseEvent<HTMLButtonElement>) => void;
  gameBoard: string[];
}

const Board = (props: BoardProps) => (
  <div className="mx-auto w-full max-w-[500px]">
    <div className="grid aspect-square w-full grid-cols-3 grid-rows-3">
      {props.gameBoard.map((value: string, i: number) => (
        <button
          key={i}
          type="button"
          data-square={i}
          aria-label={`Square ${i + 1}${value ? ` ${value}` : ' empty'}`}
          onClick={props.clicked}
          className={`flex select-none items-center justify-center border-2 border-black text-[62px] font-semibold leading-none transition hover:bg-slate-100 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-600 sm:text-[72px] md:text-[92px] ${
            i < 3 ? 'border-t-0' : ''
          } ${i % 3 === 0 ? 'border-l-0' : ''} ${
            i % 3 === 2 ? 'border-r-0' : ''
          } ${i > 5 ? 'border-b-0' : ''}`}
        >
          {value}
        </button>
      ))}
    </div>
  </div>
);

export default Board;
