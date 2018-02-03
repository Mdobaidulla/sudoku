import React, { Component } from 'react';
import '../css/Button.css';

class Square extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }

    this.changeHover = this.changeHover.bind(this);
  }

  changeHover(hover) {
    this.setState({ hover });
  }

  render() {
    return(
      <div className={"button " + this.props.classes + (this.state.hover ? " buttonHover " + this.props.hoverClasses  : "")}
           onClick={this.props.onClick}
           onMouseEnter={this.changeHover.bind(this, true)}
           onMouseLeave={this.changeHover.bind(this, false)}>
        {this.props.text}
      </div>
    )
  }
}

export default Square;
