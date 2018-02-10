import React, { Component } from 'react';
import {connect} from 'react-redux';
import {signIn, signOut, setUser} from '../../actions';
import {Link  } from 'react-router-dom';
import {Redirect,Route} from 'react-router';

import '../../styles/Auth.css';
import axios from 'axios';
const {dbServerIP} = require('../../../server/util');
const serverIp = dbServerIP;

const token = window.localStorage.getItem('token');
const email = window.localStorage.getItem('email');
const auth = window.localStorage.getItem('authenticated');

class Header extends Component {

  componentWillMount(){ 
    window.localStorage.getItem('authenticated') == 0 ? this.props.signOut():  
    axios.get(`${serverIp}user?email=${email}`, {headers:{Authorization: token}})          
    .then((res) => {console.log(res.data); this.props.setUser(res.data); /*this.props.signIn();*/ })
    .catch((err) => alert(err.response.data.message));
  }
  getLinks(){
    if (this.props.authenticated){
      return (
        <div className="App-auth">
          <div className="App-auth-link" onClick={() =>{window.localStorage.setItem('authenticated', 0);  this.props.signOut();}}>LOGOUT</div>
        </div>
      );
    } else {
      return (
          <div className="App-auth">
            <div className="App-auth-link" onClick={() => {
              window.localStorage.setItem('authenticated', 1); 
                //this.props.signIn();             
                this.props.auth.login();
            }}>SIGNIN/SIGNUP</div>
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

export default connect(mapStateToProps, {signIn, signOut, setUser})(Header);


