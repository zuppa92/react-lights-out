// src/Cell.js
import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  render() {
    const { isLit, flipCellsAroundMe } = this.props;
    let classes = "Cell" + (isLit ? " Cell-lit" : "");

    return (
      <td className={classes} onClick={flipCellsAroundMe} />
    );
  }
}

export default Cell;