import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/Home.css';
import { MemberHome} from '../index';
import {Cookies} from 'react-cookie';
import { Redirect } from 'react-router-dom';
const {accTypes} = require('../../../server/config.json');
const cookie = new Cookies();


class Home extends Component {

  render(){
     return (
      <div className="Home-wrapper">
      {  
      !this.props.authenticated && (!cookie.get('access_token') && !window.localStorage.getItem('access_token')) ?
      <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className="Home-Accounts">
         <div className="Home-header"> <h1 style={{fontSize: '8vw', textAlign: 'center'}}>START ADVERTISING TODAY!</h1></div>
          <div onClick={() => { 
            this.props.auth.login();
            window.localStorage.clear();
          }} style={{fontSize: '30px', background: 'green', padding: '20px', borderRadius: '5px', border: '1px solid black', cursor: 'pointer', color: 'white'}}>Get Started Now!</div>
        </div>
      </div> :
      accTypes.includes(this.props.user.type) ?
      <MemberHome/> :
        <div/>
      }
      </div>
    );
  }
}

const mapStatToProps = (state) => {
  return {
    authenticated: state.auth,
    user: state.user
  };
};

export default connect(mapStatToProps, null)(Home);