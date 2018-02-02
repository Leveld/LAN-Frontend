import React, { Component } from 'react';
// import sign up action

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      businessName: '',
      type: 'Content Creator'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this); 
    this.handleChangeBusinessName = this.handleChangeBusinessName.bind(this);
    this.handleChangeTypeCC = this.handleChangeTypeCC.bind(this);
    this.handleChangeTypeAdvertiser = this.handleChangeTypeAdvertiser.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
    this.handleTwitter = this.handleTwitter.bind(this);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert('Passwords do not match'); // in the future render a more user-friendly error message
    } else {
      // call sign up action
    }
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value }); 
  }

  handleChangeConfirmPassword(event) {
    this.setState({confirmPassword: event.target.value});
  }

  handleChangeBusinessName(event) {
    this.setState({ businessName: event.target.value }); 
  }

  handleChangeTypeCC() {
    this.setState({ 
      type: 'Content Creator',
      businessName: '' 
    });
  }

  handleChangeTypeAdvertiser() {
    this.setState({ type: 'Advertiser' });
  }

  handleGoogle() {
    // call action to sign up with google
  }

  handleTwitter(){
    // call action to sign up with twitter
  }

  render() {
    return (
      <div>
        <p onClick={this.handleChangeTypeCC}>Content Creator</p>
        <p onClick={this.handleChangeTypeAdvertiser}>Advertiser</p>
        <button onClick={this.handleGoogle}>Sign up with Google</button>
        <button onClick={this.handleTwitter}>Sign up with Twitter</button>
        <p> or </p>
        <form onSubmit={this.handleSubmit}>
          { this.state.type === 'Advertiser' ? 
            <div> 
              <label for='businessName'>Business Name</label>
              <input value={this.state.businessName} onChange={this.handleChangeBusinessName} id='businessName' type='type' placeholder='Enter business name' />
            </div>
            : null
          }
          <label for='email'>Email</label>
          <input value={this.state.email} onChange={this.handleChangeEmail} id='email' type='email' placeholder='Enter email address' required />
          <label for='password'>Password</label>
          <input value={this.state.password} onChange={this.handleChangePassword} id='password' type='password' placeholder='Enter password' required />
          <label for='confirmPassword'>Confirm Password</label>
          <input value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword} id='confirmPassword' type='password' placeholder="Confirm password" required/>
          <input type='submit' value='Register' />
        </form>
      </div>
    );
  }
}
