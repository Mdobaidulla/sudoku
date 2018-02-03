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
      <div className={"flexItem" + (this.state.hover ? " hover" : "") + (this.props.number ? "" : " open")}
           onClick={this.props.change.bind(this, this.props.rowIndex, this.props.positionIndex)}
           onMouseEnter={this.changeHover.bind(this, true)}
           onMouseLeave={this.changeHover.bind(this, false)}>
        {this.props.number}
      </div>
    )
  }
}

export default Square;
