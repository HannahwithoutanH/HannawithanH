import React from 'react';
//import '../styles/App.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
  }

  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }

  usernameSubmitHandler(event) {
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username });
  }

  render() {
    if (this.state.submitted) {
      return (
        <div>hi</div>
      );
    }

    return (
      <form onSubmit={this.usernameSubmitHandler} className="username-container">
        <div>
          <input
            type="text"
            onChange={this.usernameChangeHandler}
            placeholder="username"
            required
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
Login.defaultProps = {
};

export default Login;
