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
      !this.props.authenticated && !cookie.get('access_token') ?
      <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <img className="Home-bg" alt="Logo" src={'images/logo/logo.png'}/>
        <div className="Home-welcome"><img src={'images/logo/logo.png'} width="20%" height="100%"/></div>
        <div className="Home-Accounts">
          <div className="Home-Accounts-info">
            <div className="Home-Accounts-info-title">CONTENT PROVIDER</div>
          </div>
          <div className="Home-Accounts-info">
            <div className="Home-Accounts-info-title">ADVERTISER</div> 
          </div>
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