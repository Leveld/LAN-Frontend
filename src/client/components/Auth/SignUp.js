import React, { Component } from 'react';
// import sign up action

export default class SignUp extends Component {
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
  
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert('Passwords do not match'); // in the future render a more user-friendly error message
    } else {
      // call sign up action
    }
  }

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value }); 
  }

  handleChangeConfirmPassword = (event) => {
    this.setState({confirmPassword: event.target.value});
  }

  handleChangeBusinessName = (event) => {
    this.setState({ businessName: event.target.value }); 
  }

  handleChangeTypeCC = () => {
    this.setState({ 
      type: 'Content Creator',
      businessName: '' 
    });
  }

  handleChangeTypeAdvertiser = () => {
    this.setState({ type: 'Advertiser' });
  }

  handleGoogle = () => {
    // call action to sign up with google
  }

  handleTwitter = () =>{
    // call action to sign up with twitter
  }

  render() {
    return (
      <div className="App-auth-form">
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignContent: 'center'}}>
          <div className="App-auth-type" onClick={this.handleChangeTypeCC}>Content Creator</div>
          <div className="App-auth-type" onClick={this.handleChangeTypeAdvertiser}>Advertiser</div> 
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <button style={{color: 'white', background: 'red'}} onClick={this.handleGoogle}>Google</button>
          <button style={{color: 'white', background: '#03A9F4'}}onClick={this.handleTwitter}>Twitter</button>
        </div>
        <div> or </div>
        <form onSubmit={this.handleSubmit}>
          { this.state.type === 'Advertiser' ? 
            <div> 
              <label for='businessName'>Business Name</label><br />
              <input value={this.state.businessName} onChange={this.handleChangeBusinessName} id='businessName' type='type' placeholder='Enter business name' />
            </div>
            : null
          }
          <label for='email'>Email</label><br />
          <input value={this.state.email} onChange={this.handleChangeEmail} id='email' type='email' placeholder='Enter email address' required /><br />
          <label for='password'>Password</label><br />
          <input value={this.state.password} onChange={this.handleChangePassword} id='password' type='password' placeholder='Enter password' required /><br />
          <label for='confirmPassword'>Confirm Password</label><br />
          <input value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword} id='confirmPassword' type='password' placeholder="Confirm password" required/><br />
          <br />
          <input type='submit' value='Register' />
        </form>
      </div>
    );
  }
}
