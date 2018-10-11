import React from 'react';
// import '../styles/App.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
    // this.passwordSubmitHandler = this.passwordSubmitHandler.bind(this);
  }

  usernameChangeHandler(event) {
    console.log(event.target.value);
    this.setState({ username: event.target.value });
  }

  passwordChangeHandler(event) {
    this.setState({ password: event.target.value });
  }


  usernameSubmitHandler(event) {
    event.preventDefault();
  }

  // passwordSubmitHandler(event) {
  //   this.setState({ submitted: true, password: this.state.username });
  //   event.preventDefault();
  // }


  render() {
    if (this.state.submitted) {
      return (
        <div>hi</div>
      );
    }

    return (
      <div className="Login">
        <form onSubmit={this.usernameSubmitHandler}>
          <label>User Name</label>
          <input type="text" placeholder="username" value={this.state.username} onChange={this.usernameChangeHandler} />

          <label>password</label>
          <input type="text" placeholder="password" value={this.state.password} onChange={this.passwordChangeHandler} />

          <input type="submit" value="Log In" />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}
Login.defaultProps = {
};

export default Login;
