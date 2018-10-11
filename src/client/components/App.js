import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Main from './Main';
import Login from './Login';
import NavBar from './navBar/NavBar';
import MessageContainer from './MessageContainer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <NavBar />
        <Router>
          <Switch>
          <Route path="/" component={Login} />
          <Route exact path="/Main" component={Main} />
          <Route exact path="/Chat" componenet={MessageContainer} />
        </Switch>
        </Router>
      </div>
    );
  }
}


export default App;
