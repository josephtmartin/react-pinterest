import React, { Component } from 'react';
import getUid from '../helpers/data/authData';
import { getUserPins, deletePin, deleteBoardPin } from '../helpers/data/pinData';
import PinCard from '../components/PinCard';
import AppModal from '../components/AppModal';
import PinForm from '../components/Forms/PinForm';

export default class Pins extends Component {
  state = {
    pins: [],
  }

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    const userId = getUid();
    getUserPins(userId).then((pins) => this.setState({ pins }));
  }

  removePin = (e) => {
    deletePin(e.target.id)
      .then(() => {
        this.getPins();
      });
    deleteBoardPin(e.target.id);
  }

  render() {
    const { pins } = this.state;

    const renderPinsToDom = () => (
      pins.map((pin) => (
        <PinCard key={pin.firebaseKey} pin={pin} removePin={this.removePin} />
      ))
    );
    return (
      <div>
        <div className='d-flex justify-content-center'>
          <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
            <PinForm onUpdate={this.getPins} />
          </AppModal>
        </div>
        <h1 className='d-flex justify-content-center mt-3'>My Pins</h1>
        <div className='d-flex flex-wrap container justify-content-center'>
          {renderPinsToDom()}
        </div>
      </div>
    );
  }
}
