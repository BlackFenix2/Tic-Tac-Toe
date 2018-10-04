import * as React from 'react';
import './Board.module.css';

const Board = props => (
  <div className="game">
    <div
      role="presentation"
      className="board"
      onClick={props.clicked}
      onKeyUp={props.clicked}
    >
      {props.gameBoard.map((value, i) => (
        <div key={i} data-square={i}>
          {value}
        </div>
      ))}
    </div>
  </div>
);

export default Board;
