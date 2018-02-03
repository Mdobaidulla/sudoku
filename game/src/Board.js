import React, { Component } from 'react';
import './Board.css';

import Row from './Row';

import sudoku from './sudoku';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: null,
      initial: null,
      number: null,
      position: null,
      row: null,
      showModal: false,
    }

    this.checkBoard = this.checkBoard.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.generateBoard = this.generateBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.solveBoard = this.solveBoard.bind(this);
  }

  componentWillMount() {
    this.generateBoard();
  }

  generateBoard() {
    let rawBoard = sudoku.generate('medium');
    let board = rawBoard.replace(/\./g, '0');

    let newBoard = [];

    for (var i = 0; i < 9; i++) {
      newBoard.push(board.substring(i * 9, (i + 1) * 9).split('').map(s => parseInt(s)));
    }

    this.setState({ board: [...newBoard], initial: rawBoard });
  }

  solveBoard() {
    let rawSolution = sudoku.solve(this.state.initial);
    let solution = rawSolution.replace(/\./g, '0');
    let newSolution = [];

    for (var i = 0; i < 9; i++) {
      newSolution.push(solution.substring(i * 9, (i + 1) * 9).split('').map(s => parseInt(s)));
    }

    this.setState({ board: newSolution });
  }

  verifyConstraint(numbers) {
    return ((new Set(numbers)).size === numbers.length) && numbers.reduce((a, b) => a + b, 0) === 45;
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

  generateRow(row, givens) {
    return <Row positions={givens[row]} numbers={this.state.board[row]} change={this.showModal} rowIndex={row} />;
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
    let board = this.state.initial.replace(/\./g, '0');

    let newBoard = [];

    for (var i = 0; i < 9; i++) {
      newBoard.push(board.substring(i * 9, (i + 1) * 9).split('').map(s => parseInt(s)));
    }

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
          {this.generateRow(0, newBoard)}
          <br/>
          {this.generateRow(1, newBoard)}
          <br/>
          {this.generateRow(2, newBoard)}
          <br/>
          {this.generateRow(3, newBoard)}
          <br/>
          {this.generateRow(4, newBoard)}
          <br/>
          {this.generateRow(5, newBoard)}
          <br/>
          {this.generateRow(6, newBoard)}
          <br/>
          {this.generateRow(7, newBoard)}
          <br/>
          {this.generateRow(8, newBoard)}
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
