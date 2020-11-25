import React, { Component } from 'react';
import { getAllUserBoards, deleteBoard } from '../helpers/data/boardData';
import BoardCard from '../components/BoardCard';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';

export default class Boards extends Component {
  state = {
    boards: [],
    loading: true,
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const currentUserId = getUid();
    getAllUserBoards(currentUserId).then((response) => {
      this.setState({
        boards: response,
      }, this.setLoading);
    });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  removeBoard = (e) => {
    const removedBoard = this.state.boards.filter((board) => board.firebaseKey !== e.target.id);

    this.setState({
      goats: removedBoard,
    });

    deleteBoard(e.target.id)
      .then(() => {
        this.getBoards();
      });
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => (
      boards.map((board) => <BoardCard key={board.firebaseKey} board={board} removeBoard={this.removeBoard} />)
    );
    return (
      <>
        { loading ? (
          <Loader />
        ) : (
          <div>
            <div className='d-flex justify-content-center'>
            <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
              <BoardForm onUpdate={this.getBoards}/>
            </AppModal>
            </div>
          <h1 className='d-flex justify-content-center'>Here are all of your boards</h1>
          <div className='d-flex flex-wrap container'>{showBoards()}</div>
          </div>
        )}
      </>
    );
  }
}
