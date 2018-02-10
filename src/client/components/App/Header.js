import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import '../../styles/Auth.css';
import axios from 'axios';
const {dbServerIP} = require('../../../server/util');
const serverIp = dbServerIP;
class Header extends Component {

  getLinks(){
    if (this.props.authenticated){
      return (
        <div className="App-auth">
          <div className="App-auth-link">LOGOUT</div>
        </div>
      );
    } else {
      return (
        <div className="App-auth">
          <div className="App-auth-link" onClick={() => this.props.auth.login()}>SIGNIN/SIGNUP</div>
        </div>
      );
    }
  }

  render(){
    return (
      <div className="App-header">
        <Link to={this.props.authenticated ? "/profile" : "/"} className="App-header-logo" ><img  src={this.props.authenticated ? 'images/noPhoto.jpg' : 'images/logo/logo.png'} alt="Logo" style={{width: 50, height: 50}} /></Link>
        <Link to="/" className="App-header-name"><img src={'images/logo/NameLogo.png'} width="100px" /></Link>
          {this.getLinks()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    authenticated: state.auth
  };
};

export default connect(mapStateToProps, null)(Header);


