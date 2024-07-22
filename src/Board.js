// src/Board.js
import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };

  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard()
    };

    this.handleCellClick = this.handleCellClick.bind(this);
  }

  createBoard() {
    let board = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  handleCellClick(coord) {
    let [y, x] = coord.split("-").map(Number);
    let board = this.state.board;
    let nrows = this.props.nrows;
    let ncols = this.props.ncols;

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({ board: board, hasWon: hasWon });
  }

  render() {
    if (this.state.hasWon) {
      return <div className="Board-title"><h1>You Won!</h1></div>;
    }

    let tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.handleCellClick(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }

    return (
      <div>
        <div className="Board-title">
          <h1>Lights Out</h1>
        </div>
        <table className="Board">
          <tbody>{tblBoard}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;