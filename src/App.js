import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';

import Board from './components/Board';
import Button from './components/Button';

class App extends Component {
  constructor(props) {
    super(props);

    this.solve = this.solve.bind(this);
    this.check = this.check.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  solve() {
    this.board.solveBoard();
  }

  check() {
    this.board.checkBoard();
  }

  newGame() {
    this.board.showNewGameModal();
  }

  render() {
    return (
      <div className='app'>
        <div className='nav'>
          <h1 className='title'>Sudoku</h1>
          <Button onClick={this.solve} text="Solve" />
          <Button onClick={this.check} text="Check" />
          <Button classes="generate" onClick={this.newGame} text="+" />
        </div>
        <div class='space'></div>
        <Board ref={(board) => { this.board = board; }} />
      </div>
    );
  }
}

export default App;
