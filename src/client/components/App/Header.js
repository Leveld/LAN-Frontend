import React from 'react';
import '../../styles/Auth.css';

const Header = (props) => {
  return (
    <div className="App-header">
      <div className="App-header-logo"><img  src='http://one-call.ca/wp-content/uploads/2013/08/logo.png' style={{width: 70, height: 70}} /></div>
      <h2 className="App-header-name">LevelD</h2>
        <button onClick={props.auth.login}>Sign in/Sign up</button>
    </div>
  );
}


export default class Header extends Component {
  constructor(){
    super();
    this.state = {signin: false, signup: false }
  }
  getLinks(){
    if (isAuthenticated){
      return (
        <div> Link to Sign Out </div>
      );
    } else {
      return (
          <div className="App-auth">
            <div className="App-auth-link" onClick={() => this.setState({signin: !this.state.signin, signup: false})}> Sign In </div>
            <div className="App-auth-link" onClick={() => this.setState({signin: false, signup: !this.state.signup})}> Sign Up </div>
            <div className="App-signin" style={this.state.signin ? {height: 300} : {height: 0, border: '1px solid transparent'}}>
              <Signin />
            </div>
            <div className="App-signup" style={this.state.signup ? {height: 300} : {height: 0, border: '1px solid transparent'}}>
              <Signup />
            </div>
          </div>
          
      );
    }
  }

  render(){
    return (
      <div className="App-header">
        <div className="App-header-logo"><img  src='http://one-call.ca/wp-content/uploads/2013/08/logo.png' alt="Logo" style={{width: 70, height: 70}} /></div>
        <h2 className="App-header-name">LevelD</h2>
          {this.getLinks()}
      </div>
    );
  }
}

export default Header;
