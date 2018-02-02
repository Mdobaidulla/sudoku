import React, { Component } from 'react';
import './BigSquare.css';

import Square from './Square';

class BigSquare extends Component {
  constructor(props) {
    super(props);
  }

  generateSquare(numbers) {
    return numbers.map(number => <Square number={number} />)
  }

  render() {
    return(
      <div className="bigSquareContainer">
        {this.generateSquare(this.props.numbers.slice(0, 3))}
        <br/>
        {this.generateSquare(this.props.numbers.slice(3, 6))}
        <br/>
        {this.generateSquare(this.props.numbers.slice(6, 9))}
      </div>
    )
  }
}

export default BigSquare;
