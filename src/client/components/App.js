import React from 'react';
import { Route, Switch } from 'react-router';

import Main from './Main';
import Login from './Login';
import NavBar from './navBar/NavBar';

const App = () => (
  <div className="app">
    <NavBar />
    <Switch>
      <Route path="/" component={Login} />
      <Route exact path="/" component={Main} />
    </Switch>
  </div>
);

export default App;
