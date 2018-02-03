import React, { Component } from 'react';
import './Board.css';

import Row from './Row';

import { solveSudoku } from './sudokuSolver';
import sudoku from './sudoku';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [[0, 5, 2, 4, 8, 9, 3, 7, 6],
              [7, 3, 9, 2, 5, 6, 8, 4, 1],
              [4, 6, 8, 3, 7, 1, 2, 9, 5],
              [3, 8, 7, 1, 2, 4, 6, 5, 9],
              [5, 9, 1, 7, 0, 3, 4, 2, 8],
              [2, 4, 6, 8, 9, 5, 7, 1, 3],
              [9, 1, 4, 6, 3, 7, 5, 8, 2],
              [6, 2, 5, 9, 4, 8, 1, 3, 7],
              [8, 7, 3, 5, 1, 2, 9, 6, 4]],
      number: null,
      position: null,
      row: null,
      showModal: false,
      showSolution: false,
      solution: null
    }

    this.checkBoard = this.checkBoard.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.generateBoard = this.generateBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.solveBoard = this.solveBoard.bind(this);
  }

  componentDidMount() {
    console.log(sudoku.generate("insane"))
  }

  generateBoard() {
    boards[Math.floor(Math.random() * boards.length)]
  }

  verifyConstraint(numbers) {
    return ((new Set(numbers)).size === numbers.length) && numbers.reduce((a, b) => a + b, 0) === 45;
  }

  solveBoard() {
    this.setState({ showSolution: true })
  }

  checkBoard() {
    let numbers = [];

    // rows
    for (var i = 0; i < 9; i++) {
      if (!this.verifyConstraint(this.state.board[i])) {
        alert('Oh no! There is an error in row ' + (i + 1) + '.');
        return false;
      }
    }

    // columns
    for (var col = 0; col < 9; col++) {
      numbers = [];

      for (var row = 0; row < 9; row++) {
        numbers.push(this.state.board[row][col]);
      }

      if (!this.verifyConstraint(numbers)) {
        alert('Oh no! There is an error in column ' + (col + 1) + '.');
        return false;
      }
    }

    // squares
    let squares = [[], [], [], [], [], [], [], [], []];

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        squares[(3 * Math.floor(i / 3)) + Math.floor(j / 3)].push(this.state.board[i][j]);
      }
    }

    for (var i = 0; i < 9; i++) {
      if (!this.verifyConstraint(squares[i])) {
        alert('Oh no! There is an error in square ' + (i + 1) + '.');
        return false;
      }
    }

    alert('YESSS!')
    return true;
  }

  generateRow(row) {
    return <Row numbers={this.state.showSolution ? this.state.solution[row] : this.state.board[row]} change={this.showModal} rowIndex={row} />;
  }

  showModal(row, position) {
    this.setState({ row, position, showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  handleChange(event) {
    this.setState({ number: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.row, this.state.position, this.state.number);
    event.preventDefault();

    let newBoard = [...this.state.board];
    newBoard[this.state.row][this.state.position] = parseInt(this.state.number);

    this.setState({ board: newBoard, showModal: false });
  }

  render() {
    return (
      <div className="body">
        {this.state.showModal && <div className="modal">
          <form>
            <h3 className="formCaption">Note</h3>
            <input type="number" min="1" max="9" value={this.state.value} onChange={this.handleChange} />
            <div className="button" onClick={this.handleSubmit}>Submit</div>
            <div className="button" onClick={this.closeModal}>Cancel</div>
          </form>
        </div>}
        <div className="boardContainer">
          {this.generateRow(0)}
          <br/>
          {this.generateRow(1)}
          <br/>
          {this.generateRow(2)}
          <br/>
          {this.generateRow(3)}
          <br/>
          {this.generateRow(4)}
          <br/>
          {this.generateRow(5)}
          <br/>
          {this.generateRow(6)}
          <br/>
          {this.generateRow(7)}
          <br/>
          {this.generateRow(8)}
          <br/>
        </div>
        <div className="button" onClick={this.checkBoard}>Check</div>
        <div className="button" onClick={this.solveBoard}>Solve</div>
        <div className="button" onClick={this.generateBoard}>Generate</div>
      </div>
    );
  }
}

export default Board;
