import React from 'react';
import { Link } from 'react-router-dom';

export default function PinsCard({ pin, removePin }) {
  return (
    <div className='card m-2'>
      <img className='card-img-top' src={pin.imageUrl} alt='Pin Img' />
      <div className='card-body'>
        <h5 className='card-title'>{pin.name}</h5>
        <p className='card-text'>
          {pin.description}
        </p>
        <div className='button-container-pin d-flex justify-content-center'>
          <Link className='btn btn-primary m-2' to={`/pin-edit/${pin.firebaseKey}`}>
            Edit Pin
          </Link>
          <button className='btn btn-danger m-2' id={pin.firebaseKey} onClick={(e) => removePin(e)}> Delete Pin</button>
        </div>
      </div>
    </div>
  );
}
