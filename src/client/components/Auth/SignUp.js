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
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) return alert('Passwords do not match'); // in the future render a more user-friendly error message
      // call sign up action
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

  handleChangeType = (type) => {
    this.setState({type});
  }

  handleGoogle = () => {
    // call action to sign up with google
  }

  handleTwitter = () => {
    // call action to sign up with twitter
  }

  render() {
    return (
      <div className="App-auth-form">
        <select style={{fontSize: '0.7rem'}} onChange={(e) => this.handleChangeType(e.target.value)}>
          <option>Content Creator</option>
          <option>Advertiser</option>
        </select>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <button style={{color: 'white', background: 'red'}} onClick={this.handleGoogle}>Google</button>
          <button style={{color: 'white', background: '#03A9F4'}} onClick={this.handleTwitter}>Twitter</button>
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
          <input value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword} id='confirmPassword' type='password' placeholder="Confirm password" required/>
          <br />
          <br />
          <input type='submit' value='Register' />
        </form>
      </div>
    );
  }
}
