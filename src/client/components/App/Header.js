import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Cookies} from 'react-cookie';
////import '../../styles/Auth.css';
import axios from 'axios';
import {setUser, signIn, signOut, toggleSettings} from '../../actions';
const {apiServerIP, frontServerIP} = require('capstone-utils');
const {accTypes} = require('../../../server/config.json');
const cookie = new Cookies();


class Header extends Component {
  constructor(props){
    super(props);
    this.app = props.app;
    this.state = {repos: '', data: []};
  }

  componentDidMount(){
    // CHECK PULL REQUESTS
    if(!process.env.PRODUCTION){
      this.checkPR();
      setInterval(() => {
        this.setState({repos: '', data: []});
        this.checkPR();
    }, 1000000000);
    }
    const token = window.localStorage.getItem('access_token') || cookie.get('access_token');
    if(token && token.length === 32 ){
      axios.get(`${apiServerIP}user`, {headers:{Authorization:`Bearer ${token}`}})
      .then((res) => {
        if(res.data.type){
          this.props.setUser(res.data);
          accTypes.includes(res.data.type) ? this.props.signIn() : null;
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
        cookie.remove('access_token');
        window.localStorage.clear();
        this.props.auth.login();
      });
    }
  }

  checkPR = () => {
    const repos = ['Frontend', 'Api', 'DB', 'Auth', 'Utils'];
    const shortRepo = ['FE-', 'API-', 'DB-', 'AUTH-', 'UTIL-'];
    repos.forEach((repo, i) => {
      axios.get(`https://api.github.com/repos/Leveld/LAN-${repo}/pulls`)
      .then((res) => {
        if(res.data.length > 0) {
          const newdata = this.state.data.concat();
          newdata.push(res.data);
          this.setState({repos: this.state.repos + shortRepo[i], data: newdata});
        }
      });
    });
  };

  signOut = () => {
    const domain = /^(https?:\/\/)?([^:^\/]*)(:[0-9]*)(\/[^#^?]*)(.*)/g.exec(frontServerIP);
    cookie.remove('access_token', {path:'/', domain: domain[2]});
    cookie.remove('type');
    window.localStorage.clear();
    window.location.replace("/");
  }

  getLinks(){
    if (this.props.authenticated){
      return (
        <div className="app-header-authentication">
          <a className="button button--color-green signout-button" onClick={() => this.signOut()}>Sign Out</a>
        </div>
      );
    } else {
      return (
        <div className="app-header-authentication">
          <a className="button button--color-green register-button" onClick={() => {
            this.props.auth.login();
            window.localStorage.clear();
          }}>Register</a>
          <a className="button button--color-green signin-button" onClick={() => {
            this.props.auth.login();
            window.localStorage.clear();
          }}>Sign In</a>
        </div>
      );
    }
  }

  /*
  <header className="App-header">
        <div onClick={() => this.props.authenticated ? this.props.toggleSettings() : null } className="App-header-logo" >
          {1 === 2 && <img  src={this.props.authenticated ? this.props.user.profilePicture || 'images/noPhoto.jpg' : 'images/logo/logo.png'} alt="Logo" />}
          <div className="App-header-username"> {this.props.user.name}</div>

        </div>
        <div onClick={()=> console.log(this.state.data)} style={this.state.data.length > 0 ? { position: 'absolute', marginLeft: 5, cursor: 'pointer', padding: 5, borderRadius: 5,color:'white', background: 'red', fontSize: '0.7rem'} : {display: 'none'}}>PULL REQUEST FOUND <hr /> {this.state.repos}</div>
        {1 === 2 && <Link to="/" className="App-header-name"><img src={'images/logo/NameLogo.png'} width="100px" /></Link>}
  */

  render(){
    if(this.props.authenticated && cookie.get('access_token') && !window.localStorage.getItem('access_token')) window.localStorage.setItem('access_token', cookie.get('access_token'));
    return (
      <header className="header app-header">
        <nav className="header-container">
          <Link className="app-header-logo" to="/" >
            <img  src={'images/logo/logo.png'} alt="Logo" />
          </Link>

          <div className="app-header-menu">
            {this.props.authenticated ?
              <Link to="/" >
                <img  src={this.props.user.profilePicture ? this.props.user.profilePicture : 'images/noPhoto.jpg'} alt="Profile Pic" className="profile-icon profile-icon--round" />
              </Link> :
            null}
            <div className="App-header-username"> {this.props.user.name} {this.getLinks()}</div>
          </div>
        </nav>
        {this.props.user.name && this.props.authenticated ?
        <div className="header-sidebar-toolbar">
          <div className="header-settings-button no-select" onClick={() => this.props.authenticated ? this.props.toggleSettings() : null }>
            Settings
          </div>
          <Link className="button button--color-green header-sidebar-button button--round App-header-view" to={`/profile?id=${this.props.user._id}&type=${this.props.user.type}`}>View Profile</Link>
        </div> : null}
        <div onClick={()=> console.log(this.state.data)} style={this.state.data.length > 0 ? { position: 'absolute', marginLeft: 5, padding: 5, borderRadius: 5,color:'white', background: 'red', fontSize: '0.7rem'} : {display: 'none'}}>PULL REQUEST FOUND <hr /> {this.state.repos}</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth,
    user: state.user
  };
};

export default connect(mapStateToProps, {setUser, signIn, signOut, toggleSettings })(Header);
