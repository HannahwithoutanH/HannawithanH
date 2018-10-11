import React from 'react';
import { Route, Switch } from 'react-router';

import Main from './Main';
import Login from './Login';

const App = () => (
  <div className="app">
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/Login" component={Login} />
    </Switch>
  </div>
);

export default App;
