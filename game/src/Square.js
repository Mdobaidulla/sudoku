import React, { Component } from 'react';
import './Square.css';

class Square extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: props.number
    }
  }

  render() {
    return(
      <div className="squareContainer">
        <p className="number">{this.state.number}</p>
      </div>
    )
  }
}

export default Square;
