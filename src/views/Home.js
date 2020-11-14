import React from 'react';
import BoardContainer from '../components/BoardContainer';
import Auth from '../components/Auth';

export default function Home(props) {
  const loadComponent = () => {
    let component = '';
    if (props.authed) {
      component = <BoardContainer />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
    <div>
      <h2>Home Page</h2>
      {loadComponent()}
    </div>
  );
}
