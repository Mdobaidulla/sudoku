import React, { Component } from 'react';
import './Square.css';

class Square extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }

    this.changeHover = this.changeHover.bind(this);
  }

  changeHover(hover) {
    this.setState({ hover })
  }

  render() {
    return(
      <div className={"flexItem" + (this.state.hover && !this.props.initial ? " hover" : "") +
                      (this.props.number ? "" : " open") +
                      (this.props.rowIndex === 3 || this.props.rowIndex === 6 ? " borderTopSquare" : "") +
                      (this.props.positionIndex === 2 || this.props.positionIndex === 5 ? " borderRightSquare" : "") +
                      (this.props.initial ? " initial" : "")}
           onClick={this.props.initial ? null : this.props.change.bind(this, this.props.rowIndex, this.props.positionIndex)}
           onMouseEnter={this.changeHover.bind(this, true)}
           onMouseLeave={this.changeHover.bind(this, false)}>
        {this.props.number}
      </div>
    )
  }
}

export default Square;
