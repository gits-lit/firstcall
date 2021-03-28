import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.scss';

import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/landing" component={LandingPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
