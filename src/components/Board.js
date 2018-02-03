import React, { Component } from 'react';
import '../css/Board.css';

import Button from '../components/Button';
import Row from '../components/Row';

import sudoku from '../helpers/sudoku';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: null,
      difficulty: null,
      focus: false,
      initial: null,
      number: null,
      position: null,
      row: null,
      showNewGameModal: false,
      showNumberModal: false
    }

    this.checkBoard = this.checkBoard.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.focus = this.focus.bind(this);
    this.generateBoard = this.generateBoard.bind(this);
    this.handleNewGameChange = this.handleNewGameChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleNewGameSubmit = this.handleNewGameSubmit.bind(this);
    this.handleNumberSubmit = this.handleNumberSubmit.bind(this);
    this.showNewGameModal = this.showNewGameModal.bind(this);
    this.showNumberModal = this.showNumberModal.bind(this);
    this.solveBoard = this.solveBoard.bind(this);
  }

  componentWillMount() {
    this.generateBoard('medium');
  }

  generateBoard(difficulty) {
    let rawBoard = sudoku.generate(difficulty);
    let board = rawBoard.replace(/\./g, '0');

    let newBoard = [];

    for (var i = 0; i < 9; i++) {
      newBoard.push(board.substring(i * 9, (i + 1) * 9).split('').map(s => parseInt(s)));
    }

    this.setState({ board: [...newBoard], initial: rawBoard, showNewGameModal: false, difficulty: null });
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

    alert('You win!')
    return true;
  }

  generateRow(row, givens) {
    return <Row positions={givens[row]} numbers={this.state.board[row]} change={this.showNumberModal} rowIndex={row} />;
  }

  showNumberModal(row, position) {
    this.setState({ row, position, showNumberModal: true });
  }

  showNewGameModal() {
    this.setState({ showNewGameModal: true });
  }

  closeModal(isNumber) {
    this.setState(isNumber ? { showNumberModal: false } : { showNewGameModal: false });
  }

  handleNumberChange(event) {
    this.setState({ number: event.target.value });
  }

  handleNewGameChange(event) {
    this.setState({ difficulty: event.target.value });
  }

  handleNumberSubmit(event) {
    event.preventDefault();

    if (!this.state.number || parseInt(this.state.number) < 1 || parseInt(this.state.number) > 9) {
      return alert('Numbers must be between 1 and 9.');
    }

    let newBoard = [...this.state.board];
    newBoard[this.state.row][this.state.position] = parseInt(this.state.number);

    this.setState({ board: newBoard, showNumberModal: false, number: null });
  }

  handleNewGameSubmit(event) {
    event.preventDefault();

    if (!this.state.difficulty) {
      return alert('Must enter a difficulty.');
    }

    this.generateBoard(this.state.difficulty);
  }

  focus(shouldFocus) {
    if (this.state.focus !== shouldFocus) {
      this.setState({ focus: shouldFocus });
    }
  }

  render() {
    let board = this.state.initial.replace(/\./g, '0');

    let newBoard = [];

    for (var i = 0; i < 9; i++) {
      newBoard.push(board.substring(i * 9, (i + 1) * 9).split('').map(s => parseInt(s)));
    }

    return (
      <div className="content">
        {this.state.showNumberModal && <div className="modal">
          <form>
            <h3 className="formCaption">Change Square</h3>
            <input className={"input" + (this.state.focus ? " focus" : "")}
                   type="number"
                   min="1"
                   max="9"
                   placeholder="1"
                   value={this.state.value}
                   onChange={this.handleNumberChange}
                   onFocus={this.focus.bind(this, true)}
                   onBlur={this.focus.bind(this, false)} />
          </form>
          <Button classes="formButton submit" hoverClasses="submitHover" onClick={this.handleNumberSubmit} text="Submit" />
          <Button classes="formButton cancel" onClick={this.closeModal.bind(this, true)} text="Cancel" />
        </div>}
        {this.state.showNewGameModal && <div className="modal">
          <h3 className="formCaption">New Game Difficulty</h3>
          <form className="radioInputs">
            <input type="radio"
                   name="difficulty"
                   value="easy"
                   id="easy"
                   checked={this.state.difficulty === "easy"}
                   onChange={this.handleNewGameChange} />
            <label for="easy">Easy</label>
            <input type="radio"
                   name="difficulty"
                   value="medium"
                   id="medium"
                   checked={this.state.difficulty === "medium"}
                   onChange={this.handleNewGameChange} />
            <label for="medium">Medium</label>
            <input type="radio"
                   name="difficulty"
                   value="hard"
                   id="hard"
                   checked={this.state.difficulty === "hard"}
                   onChange={this.handleNewGameChange} />
            <label for="hard">Hard</label>
            <input type="radio"
                   name="difficulty"
                   value="very-hard"
                   id="very-hard"
                   checked={this.state.difficulty === "very-hard"}
                   onChange={this.handleNewGameChange} />
            <label for="very-hard">Very Hard</label>
            <input type="radio"
                   name="difficulty"
                   value="insane"
                   id="insane"
                   checked={this.state.difficulty === "insane"}
                   onChange={this.handleNewGameChange} />
            <label for="insane">Wicked (!)</label>
          </form>
          <Button classes="formButton submit" hoverClasses="submitHover" onClick={this.handleNewGameSubmit} text="Submit" />
          <Button classes="formButton cancel" onClick={this.closeModal.bind(this, false)} text="Cancel" />
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
      </div>
    );
  }
}

export default Board;
