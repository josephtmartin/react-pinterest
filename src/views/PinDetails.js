import React, { Component } from 'react';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/AppModal';
import { getPin } from '../helpers/data/pinData';
import FormDropdown from '../components/FormDropdown';

export default class PinDetails extends Component {
  state = {
    pin: {},
  }

  componentDidMount() {
    const pinId = this.props.match.params.id;
    this.getPinInfo(pinId);
  }

  getPinInfo = (pinId) => {
    getPin(pinId).then((response) => {
      this.setState({
        pin: response,
      });
    });
  }

  render() {
    const { pin } = this.state;

    return (
      <>
      <div className='d-flex justify-content-center'>
        <AppModal title={'Update Pin'} buttonLabel={'Update Pin'}>
          { Object.keys(pin).length && <PinForm pin={pin} onUpdate={this.getPinInfo} />}
        </AppModal>
      </div>
        <h1 className='d-flex justify-content-center mt-3'>{pin.name}</h1>
        <div className='d-flex flex-wrap container'>
          <div className='card m-2'>
            <img className='card-img-top' src={pin.imageUrl} alt='Pin Img' />
            <div className='card-body'>
              <h5 className='card-title'>{pin.name}</h5>
              <p className='card-text'>
                {pin.description}
              </p>
              <FormDropdown pin={pin.firebaseKey}/>
            </div>
        </div>
        </div>
      </>
    );
  }
}
