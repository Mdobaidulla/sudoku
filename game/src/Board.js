import React, { Component } from 'react';
import './Board.css';

import BigSquare from './BigSquare';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [[0, 3, 5, 3, 4, 5, 6, 7, 8],
              [1, 0, 0, 0, 0, 0, 0, 3, 0],
              [2, 0, 0, 0, 0, 0, 2, 0, 0],
              [3, 0, 0, 0, 0, 0, 0, 0, 0],
              [4, 0, 1, 0, 2, 0, 0, 0, 0],
              [5, 0, 0, 0, 0, 0, 0, 0, 0],
              [6, 0, 0, 0, 0, 0, 4, 0, 0],
              [7, 0, 0, 0, 0, 0, 7, 0, 0],
              [8, 0, 0, 0, 0, 0, 0, 8, 0]]
    }
  }

  generateBigSquare(rows) {
    return rows.map(row => <BigSquare numbers={row} />)
  }

  render() {
    return (
      <div className="boardContainer">
        {this.generateBigSquare(this.state.board.slice(0, 3))}
        <br/>
        {this.generateBigSquare(this.state.board.slice(3, 6))}
        <br/>
        {this.generateBigSquare(this.state.board.slice(6, 9))}
      </div>
    );
  }
}

export default Board;
