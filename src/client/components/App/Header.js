import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import '../../styles/Auth.css';
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
      // this.checkPR();      
      // setInterval(() => {
      //   this.setState({repos: '', data: []});
      //   this.checkPR(); 
      // }, 10000);
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
        <div className="App-auth">
          <div className="App-auth-link" onClick={() => this.signOut()}>LOGOUT</div>
        </div>
      );
    } else {
      return (
        <div className="App-auth">
          <div className="App-auth-link" onClick={() => { 
            this.props.auth.login();
            window.localStorage.clear();
          }}>SIGNIN/SIGNUP</div>
        </div>
      );
    }
  }

  render(){
    if(this.props.authenticated && cookie.get('access_token') && !window.localStorage.getItem('access_token')) window.localStorage.setItem('access_token', cookie.get('access_token'));
    return (
      <div className="App-header">
        <div style={{cursor:'pointer'}} onClick={() => this.props.authenticated ? this.props.toggleSettings() : null } className="App-header-logo" >
          <img  src={this.props.authenticated ? this.props.user.profilePicture || 'images/noPhoto.jpg' : 'images/logo/logo.png'} alt="Logo" style={{width: 50, height: 50}} />
          <div className="App-header-username" style={{textDecorationUnderline: 'none'}}> {this.props.user.name}</div>

        </div>
        <div onClick={()=> console.log(this.state.data)} style={this.state.data.length > 0 ? { position: 'absolute', marginLeft: 5, cursor: 'pointer', padding: 5, borderRadius: 5,color:'white', background: 'red', fontSize: '0.7rem'} : {display: 'none'}}>PULL REQUEST FOUND <hr /> {this.state.repos}</div>
        <Link to="/" className="App-header-name"><img src={'images/logo/NameLogo.png'} width="100px" /></Link>

          {this.getLinks()}
      </div>
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


