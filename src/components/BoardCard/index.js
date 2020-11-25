import React from 'react';
import { Link } from 'react-router-dom';

export default function BoardsCard({ board, removeBoard }) {
  return (
        <div className='card m-2'>
          <img className='card-img-top' src={board.imageUrl} alt='Board Img' />
          <div className='card-body'>
            <h5 className='card-title'>{board.name}</h5>
            <p className='card-text'>
              {board.description}
            </p>
            <div className='button-container-board d-flex justify-content-center'>
              <Link className='btn btn-primary m-2' to={`/boards/${board.firebaseKey}`}>
                View Pins
              </Link>
              <button className='btn btn-danger m-2' id={board.firebaseKey} onClick={(e) => removeBoard(e)}> Delete Board</button>
            </div>
          </div>
        </div>
  );
}
