import React, { Component } from 'react';
// import sign in action

export class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
    this.handleTwitter = this.handleTwitter.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // call sign in action
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value }); 
  }

  handleGoogle() {
    // call action to sign in with google
  }

  handleTwitter(){
    // call action to sign in with twitter
  }

  render() {
    return (
      <div>
        <button onClick={this.handleGoogle}>Sign in with Google</button>
        <button onClick={this.handleTwitter}>Sign in with Twitter</button>
        <form onSubmit={this.handleSubmit}>
          <label for='email'>Email</label>
          <input value={this.state.email} onChange={this.handleChangeEmail} id='email' type='email' placeholder='Enter email address' required />
          <label for='password'>Password</label>
          <input value={this.state.password} onChange={this.handleChangePassword} id='password' type='password' placeholder='Enter password' required />
          <input type='submit' value='Sign In' />
        </form>
      </div>
    );
  }
}