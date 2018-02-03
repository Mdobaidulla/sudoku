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
              [8, 0, 0, 0, 0, 0, 0, 8, 0]],
      number: null,
      position: null,
      row: null,
      showModal: false
    }

    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  generateBigSquare(rows, rowIndex) {
    return rows.map((row, i) => <BigSquare numbers={row} change={this.showModal} rowIndex={3 * rowIndex + i} />)
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
          {this.generateBigSquare(this.state.board.slice(0, 3), 0)}
          <br/>
          {this.generateBigSquare(this.state.board.slice(3, 6), 1)}
          <br/>
          {this.generateBigSquare(this.state.board.slice(6, 9), 2)}
        </div>
      </div>
    );
  }
}

export default Board;
