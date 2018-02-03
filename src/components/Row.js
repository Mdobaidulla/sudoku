import React, { Component } from 'react';
import '../css/Row.css';

import Square from '../components/Square';

class Row extends Component {
  constructor(props) {
    super(props);
  }

  generateSquares(numbers) {
    return numbers.map((number, i) => <Square initial={this.props.positions[i] !== 0} number={number} change={this.props.change} rowIndex={this.props.rowIndex} positionIndex={i} />)
  }

  render() {
    return(
      <div className="rowContainer">
        <div className="flexContainer">
          {this.generateSquares(this.props.numbers)}
        </div>
      </div>
    )
  }
}

export default Row;
