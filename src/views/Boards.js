import React, { Component } from 'react';
import { getBoards } from '../helpers/data/boardData';
import BoardsCard from '../components/BoardCard';
import BoardsForm from '../components/Forms/BoardForm';

export default class Boards extends Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    this.getAllBoards();
  }

  getAllBoards = () => {
    getBoards().then((response) => this.setState({ boards: response }));
  };

  render() {
    const { boards } = this.state;
    const renderBoardToDom = () => boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} />);

    return (
      <div className='board-container'>
        <BoardsForm />
        <h2>Here Are All Your Boards</h2>
        <div className='d-flex flex-wrap container'>
          {renderBoardToDom()}
        </div>
      </div>
    );
  }
}
