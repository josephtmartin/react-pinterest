import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../views/Home';
import Boards from '../views/Boards';
import BoardForm from '../views/BoardForm';
import PinDetails from '../views/PinDetails';
import PinForm from '../views/PinForm';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import NotFound from '../views/NotFound';

export default function Routes({ user }) {
  return (
    <Switch>
      <Route exact path='/' component={() => <Home user={user} />} />
      <Route exact path='/boards' component={() => <Boards user={user} />} />
      <Route exact path='/board-form' component={() => <BoardForm user={user} />} />
      <Route exact path='/pin-details' component={() => <PinDetails user={user} />} />
      <Route exact path='/pin-form' component={() => <PinForm user={user} />} />
      <Route exact path='/pins' component={() => <Pins user={user} />} />
      <Route
        exact
        path='/boards/:id'
        component={(props) => <SingleBoard user={user} {...props} />}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
