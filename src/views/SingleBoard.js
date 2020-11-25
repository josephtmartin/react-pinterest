import React, { Component } from 'react';
import {
  getBoardPins,
  getPin,
  deletePin,
  deleteBoardPin,
} from '../helpers/data/pinData';
import { getSingleBoard } from '../helpers/data/boardData';
import PinsCard from '../components/PinCard';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';

export default class SingleBoard extends Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    // 1. Pull boardId from URL params
    const boardId = this.props.match.params.id;
    // 2. Make a call to the API that gets the board info
    this.getBoardInfo(boardId);
    // 3. Make a call to the API that returns the pins associated with this board and set to state.
    this.getPins(boardId)
      // because we did a promise.all, the response will not resolve until all the promises are completed
      .then((resp) => (
        this.setState({ pins: resp })
      ));
  }

  getBoardInfo = (boardId) => {
    getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });
  }

  getPins = (boardId) => (
    getBoardPins(boardId).then((response) => {
      // an array that holds all of the calls to get the pin information
      const pinArray = [];
      response.forEach((item) => {
        // pushing a function that returns a promise into the pinArray
        pinArray.push(getPin(item.pinId));
      });
      // returning an array of all the fullfilled promises
      return Promise.all([...pinArray]);
    })
  )

  removePin = (e) => {
    const notRemovedPins = this.state.pins.filter(
      (pin) => pin.firebaseKey !== e.target.id,
    );
    this.setState({
      pins: notRemovedPins,
    });
    deletePin(e.target.id).then(() => {
      this.getPins();
    });
    deleteBoardPin(e.target.id);
  };

  render() {
    const { pins, board } = this.state;
    const renderPins = () => (
      // 4. map over the pins in state
      pins.map((pin) => (
        <PinsCard key={pin.firebaseKey} pin={pin} removePin={this.removePin} />
      ))
    );
    // 5. Render the pins on the DOM
    return (
      <div>
        <div className='d-flex justify-content-center'>
          <AppModal title={'Update Board'} buttonLabel={'Update Board'}>
            { Object.keys(board).length && <BoardForm board={board} onUpdate={this.getBoardInfo} />}
          </AppModal>
        </div>
        <h1 className='d-flex justify-content-center'>{board.name}</h1>
        <div className='d-flex flex-wrap container'>
          {renderPins()}
        </div>
      </div>
    );
  }
}
