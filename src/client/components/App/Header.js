import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Cookies} from 'react-cookie';
////import '../../styles/Auth.css';
import axios from 'axios';
import {setUser, signIn, signOut, toggleSettings} from '../../actions';
import {Search} from '../../components';
const {apiServerIP, frontServerIP, BETA, IS_DEVELOPMENT} = require('capstone-utils');
const {accTypes} = require('../../../server/config.json');
const cookie = new Cookies();


class Header extends Component {
  constructor(props){
    super(props);
    this.app = props.app;
    this.state = {repos: '', data: []};
  }

  componentWillMount(){
    // CHECK PULL REQUESTS
    if (IS_DEVELOPMENT) {
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
        if (!res.data.type) return this.signOut();
          this.props.setUser(res.data);
          accTypes.includes(res.data.type) ? this.props.signIn() : null;
      })
      .catch((err) => {
        this.signOut();
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
    const domain = /^(https?:\/\/)?([^:^\/]*)(:[0-9]*)?(\/[^#^?]*)(.*)/g.exec(frontServerIP);
    cookie.remove('access_token', {path:'/', domain: domain[2]});
    cookie.remove('type');
    window.localStorage.clear();
    window.location.href = "/";
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
          <a className="button button--color-green button--hover-white" onClick={() => {
            this.props.auth.login();
            window.localStorage.clear();
          }}>Login</a>
        </div>
      );
    }
  }

  render(){
    if(this.props.authenticated && cookie.get('access_token') && !window.localStorage.getItem('access_token'))
      window.localStorage.setItem('access_token', cookie.get('access_token'));
    if(this.props.authenticated && !this.props.user) return <div />;
    return (
      <header className="header app-header">
        <nav className="header-container">
          <Link className="app-header-logo" style={{flex: 'none'}} to="/" >
            <img  src={'images/logo/logo2.png'} alt="Logo" />
          </Link>
          {BETA ? <div style={{flex:1, display: 'flex', alignItems: 'center', color: '#00AA5D'}}>BETA</div> : null}
          <div className="app-header-menu">
            {this.props.authenticated ?
              <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Link to="/" >
                  <img src={this.props.user.profilePicture ? this.props.user.profilePicture : 'images/noPhoto.jpg'}
                    alt="Profile Pic"
                    className="profile-icon profile-icon--round" />
                </Link>
                <div className="App-header-username"> {this.props.user.name} {this.getLinks()}</div>
              </div> :
            !window.localStorage.getItem('access_token') && !this.props.user ? <div className="App-header-username">{this.getLinks()}</div> : null}
            
          </div>
        </nav>
        {this.props.authenticated ? <Search type="main"/> : null}
        {this.props.user.name && this.props.authenticated ?
        <div className="header-sidebar-toolbar">
          <div className="header-settings-button no-select"
            onClick={() => this.props.authenticated ? this.props.toggleSettings() : null }>
            Settings
          </div>
          <Link className="button button--color-green header-sidebar-button button--round App-header-view"
            to={`/profile?id=${this.props.user._id}&type=${this.props.user.type}`}>View Profile</Link>
          <Link className="button button--color-green header-sidebar-button button--round App-header-view"
            to={`/messages`}>Messages</Link>
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
