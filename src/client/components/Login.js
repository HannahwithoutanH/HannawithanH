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
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }

  passwordChangeHandler(event) {
    this.setState({ password: event.target.value });
  }


  usernameSubmitHandler(event) {
    event.preventDefault();
    const credentials = {
      email: this.state.username,
      password: this.state.password,
    };

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(credentials),
    }).then(res => res.json())
      .then(jsonRes => window.localStorage.setItem('token', jsonRes.token))
      .catch(err=>alert(err));
  }

  handleLogin() {
    const credentials = {
      email: this.state.username,
      password: this.state.password,
    };
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(credentials),
    })
      .then(res => res.json())
      .then((jsonRes) => {
        if (jsonRes.token)window.localStorage.setItem('token', jsonRes.token);
        else alert('invalid credentials');
      })
      .catch(err => console.error(err));
  }

  // passwordSubmitHandler(event) {
  //   this.setState({ submitted: true, password: this.state.username });
  //   event.preventDefault();
  // }


  render() {
    if (this.state.submitted) {
      return (
        <div>
hi
        </div>
      );
    }

    return (
      <div className="Login">
        <form onSubmit={this.usernameSubmitHandler}>
          <label>
User Name
          </label>
          <input type="text" placeholder="username" value={this.state.username} onChange={this.usernameChangeHandler} />

          <label>
password
          </label>
          <input type="text" placeholder="password" value={this.state.password} onChange={this.passwordChangeHandler} />


          <input id="signup" type="submit" value="Sign Up" />
        </form>
        <button id="login" onClick={this.handleLogin}>
Login
        </button>
      </div>
    );
  }
}
Login.defaultProps = {
};

export default Login;
