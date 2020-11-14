import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Home from '../views/Home';
import Boards from '../views/Boards';
import BoardForm from '../views/BoardForm';
import PinDetails from '../views/PinDetails';
import PinForm from '../views/PinForm';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import NotFound from '../views/NotFound';

export default function Routes({ authed }) {
  return (
    <Router>
          <Switch>
            <Route exact path='/' component={() => <Home authed={authed} />} />
            <Route exact path='/boards' component={() => <Boards authed={authed} />} />
            <Route exact path='/board-form' component={() => <BoardForm authed={authed} />} />
            <Route exact path='/pin-details' component={() => <PinDetails authed={authed} />} />
            <Route exact path='/pin-form' component={() => <PinForm authed={authed} />} />
            <Route exact path='/pins' component={() => <Pins authed={authed} />} />
            <Route exact path='/single-board' component={() => <SingleBoard authed={authed} />} />
            <Route component={NotFound} />
          </Switch>
        </Router>
  );
}
