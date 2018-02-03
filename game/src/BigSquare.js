import React, { Component } from 'react';
import './BigSquare.css';

import Square from './Square';

class BigSquare extends Component {
  constructor(props) {
    super(props);
  }

  generateSquares(numbers, positionIndex) {
    return numbers.map((number, i) => <Square number={number} change={this.props.change} rowIndex={this.props.rowIndex} positionIndex={3 * positionIndex + i} />)
  }

  render() {
    return(
      <div className="bigSquareContainer">
        <div className="flexContainer">
          {this.generateSquares(this.props.numbers.slice(0, 3), 0)}
        </div>
        <div className="flexContainer">
          {this.generateSquares(this.props.numbers.slice(3, 6), 1)}
        </div>
        <div className="flexContainer">
          {this.generateSquares(this.props.numbers.slice(6, 9), 2)}
        </div>
      </div>
    )
  }
}

export default BigSquare;
