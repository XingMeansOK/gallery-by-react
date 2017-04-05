import React, {Component} from 'react';

export class ControllerUnit extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    return (
      <span className="controller-unit" onClick={this.handleClick}/>
    );
  }
}
