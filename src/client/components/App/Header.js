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

export default Header;
