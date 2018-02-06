import React, { Component } from 'react';
import { signUp } from '../../actions';
import { connect } from 'react-redux';

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
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert('Passwords do not match'); // in the future render a more user-friendly error message
    } else {
      this.props.signUp(this.state);
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
          <div className="App-auth-type" style={this.state.type === 'Content Creator' ? {background: 'blue', color: 'white'} : {background: 'orange'}} onClick={this.handleChangeTypeCC}>Content Creator</div>
          <div className="App-auth-type" style={this.state.type === 'Advertiser' ? {background: 'blue', color: 'white'} : {background: 'orange'}} onClick={this.handleChangeTypeAdvertiser}>Advertiser</div> 
        </div>
        <div className="App-auth-form-inputs">
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <button style={{color: 'white', background: 'red'}} onClick={this.handleGoogle}>Google</button>
            <button style={{color: 'white', background: '#03A9F4'}}onClick={this.handleTwitter}>Twitter</button>
          </div>
          <div> or </div>
          <form onSubmit={this.handleSubmit}>
            { this.state.type === 'Advertiser' ? 
              <div> 
                <label>Business Name</label><br />
                <input value={this.state.businessName} onChange={this.handleChangeBusinessName} name='businessName' type='type' placeholder='Enter business name' />
              </div>
              : null
            }
            <label >Email</label><br />
            <input value={this.state.email} onChange={this.handleChangeEmail} name='email' type='email' placeholder='Enter email address' required /><br />
            <label  >Password</label><br />
            <input value={this.state.password} onChange={this.handleChangePassword} name='password' type='password' placeholder='Enter password' required /><br />
            <label >Confirm Password</label><br />
            <input value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword} name='confirmPassword' type='password' placeholder="Confirm password" required/><br />
            <br />
            <input type='submit' value='Register' />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { signUp })(SignUp);