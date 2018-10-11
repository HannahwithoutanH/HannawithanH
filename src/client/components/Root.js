import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './Login';

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/Login" component={Login} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
);

export default Root;
