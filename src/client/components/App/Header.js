import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import '../../styles/Auth.css';
import axios from 'axios';
import {setUser, signIn, signOut} from '../../actions';
const {apiServerIP, frontServerIP, accTypes} = require('../../../server/util');
const cookies = new Cookies();


class Header extends Component {

  componentWillMount(){
   // this.props.signIn();
      
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
        alert(err);
      });
    }
  }

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
        <Link to={this.props.authenticated ? "/profile" : "/"} className="App-header-logo" >
          <img  src={this.props.authenticated ? 'images/noPhoto.jpg' : 'images/logo/logo.png'} alt="Logo" style={{width: 50, height: 50}} />
          <div className="App-header-username" style={{textDecorationUnderline: 'none'}}> {this.props.user.name}</div>
        </Link>
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


