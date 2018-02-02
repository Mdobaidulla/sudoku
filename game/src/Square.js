import React, { Component } from 'react';
import './Square.css';

class Square extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="squareContainer">
        <p className="number">{this.props.number}</p>
      </div>
    )
  }
}

export default Square;
