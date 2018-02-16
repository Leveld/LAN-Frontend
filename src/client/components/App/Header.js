import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import '../../styles/Auth.css';
import axios from 'axios';
import {setUser, signIn, signOut} from '../../actions';
const {apiServerIP, frontServerIP} = require('capstone-utils');
const {accTypes} = require('../../../server/config.json');
const cookies = new Cookies();


class Header extends Component {
  constructor(props){
    super(props);
    this.app = props.app;
    this.state = {repos: '', data: []};
    this.repos = []
  }

  componentWillMount(){
    // CHECK PULL REQUESTS
    this.checkPR();
    if(!process.env.PRODUCTION){
      setInterval(() => {
        this.setState({repos: '', data: []});
        this.checkPR(); 
      }, 10000);
    }
    const akey = cookies.get('access_token');
    if(akey && akey.length === 32){
      axios.get(`${apiServerIP}user`, {headers:{Authorization:`Bearer ${akey}`}})
      .then((res) => {
        if(res.data.type){
          this.props.setUser(res.data);
          accTypes.includes(res.data.type) ? this.props.signIn() : null;
        }    
      })
      .catch((err) => {
        alert(err.response.data.message);
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
    cookies.remove('access_token', {path:'/', domain: domain[2]});
    cookies.remove('type');
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
          <div className="App-auth-link" onClick={() => this.props.auth.login()}>SIGNIN/SIGNUP</div>
        </div>
      );
    }
  }

  render(){
    console.log()
    return (
      <div className="App-header">
        <div style={{cursor:'pointer'}} onClick={() => this.props.authenticated ? this.app.setState({settings: !this.app.state.settings}) : null } className="App-header-logo" >
          <img  src={this.props.authenticated ? 'images/noPhoto.jpg' : 'images/logo/logo.png'} alt="Logo" style={{width: 50, height: 50}} />
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

export default connect(mapStateToProps, {setUser, signIn, signOut })(Header);


