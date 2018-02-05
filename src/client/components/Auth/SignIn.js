import React, { Component } from 'react';
// import sign in action

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    // call sign in action
  }

  handleChangeEmail = (evt) => {
    this.setState({ email: evt.target.value });
  }

  handleChangePassword = (evt) => {
    this.setState({ password: evt.target.value }); 
  }

  handleGoogle = () => {
    // call action to sign in with google
  }

  handleTwitter = () => {
    // call action to sign in with twitter
  }

  render() {
    return (
      <div className="App-auth-form">
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <button style={{color: 'white', background: 'red'}} onClick={this.handleGoogle}>Google</button>
          <button style={{color: 'white', background: '#03A9F4'}} onClick={this.handleTwitter}>Twitter</button>
        </div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label for='Auth-signin-email'>Email</label><br />
          <input value={this.state.email} onChange={this.handleChangeEmail} id='email' type='email' placeholder='Enter email address' required /><br />
          <label for='Auth-signin-password'>Password</label><br />
          <input value={this.state.password} onChange={this.handleChangePassword} id='password' type='password' placeholder='Enter password' required /><br />
          <br />
          <input type='submit' value='Sign In' />
        </form>
      </div>
    );
  }
}