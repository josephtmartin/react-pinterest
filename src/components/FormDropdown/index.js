import React, { Component } from 'react';
import { createBoardPin } from '../../helpers/data/pinData';
import { getAllUserBoards } from '../../helpers/data/boardData';
import getUid from '../../helpers/data/authData';

export default class FormDropdown extends Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    const userId = getUid();
    this.setState({
      userId,
    });
    this.getUserBoards(userId);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    const { board, userId } = this.state;
    const { pin } = this.props;
    e.preventDefault();
    createBoardPin(board, pin, userId);
  };

  getUserBoards = (userId) => {
    getAllUserBoards(userId).then((response) => {
      this.setState({ boards: response });
    });
  }

  render() {
    const { boards, pinnedBoard } = this.state;

    const populateDropdown = () => (
      boards.map((board) => <option value ={board.firebaseKey} key={board.firebaseKey}>{board.name}</option>)
    );

    return (
    <div className="d-flex justify-content-center">
    <form onSubmit={this.handleSubmit} className="add-board-form">
    <select
        className="form-control form-control-lg m-1"
        name="board"
        value={pinnedBoard}
        onChange={this.handleChange}
        required
    >
        <option value="" defaultValue disabled hidden>Add Pin to Board</option>
        {Object.keys(boards).length && populateDropdown()}
    </select>
    <button className="btn form-button form-button-text mt-1">
        Submit
    </button>
    </form>
    </div>
    );
  }
}
