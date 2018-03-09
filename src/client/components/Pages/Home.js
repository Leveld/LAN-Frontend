import React, {Component} from 'react';
import {connect} from 'react-redux';
//import '../../styles/Home.css';
import { MemberHome} from '../index';
import {Cookies} from 'react-cookie';
import { Redirect } from 'react-router-dom';
const {accTypes} = require('../../../server/config.json');
const cookie = new Cookies();


class Home extends Component {

  render(){
    return (
      <main className="Home-wrapper">
      {
      !this.props.authenticated && (!cookie.get('access_token') && !window.localStorage.getItem('access_token')) ?
      <div>
        {1 === 2 && <img className="Home-bg" alt="Logo" src={'images/logo/banner.png'}/>}
        <div className='hero-message'>
          <h2 className='hero-heading'>Quality Content, meet Quality Advertisers. It&#39;s about time you two met.</h2>
          <a className='button button-cta hero-anchor' onClick={() => {
            this.props.auth.login();
            window.localStorage.clear();
          }}>Register And See</a>
        </div>
        <section className="Home-Accounts hero-cta push-up">
          <div className='hero-metric'>
            <h2>Quality Metrics</h2>
            <img src='images/inc/engagementSVG/019-leader.svg' />
            <p>
              Find the gem in the rough. When you find those audience influencers, you can maintain
              those valuable connections and keep seeing upsticks in engagement.
            </p>
          </div>

          <div className='hero-metric'>
            <h2>Quality Metrics</h2>
            <img src='images/inc/engagementSVG/013-presentation.svg' />
            <p>See qaulity metrics straight from your connections and get valuable feedback.</p>
          </div>

          <div className='hero-metric'>
            <h2>Make Valuable Connections</h2>
            <img src='images/inc/engagementSVG/028-connection.svg' />
            <p>
              Throwing your ads in a pool with everyone else is gone. Make quality connections
              directly with audience influencers that feel strongly about your message.
            </p>
          </div>
          {/*
          <section className="Home-Accounts-info">
            <div className="Home-Accounts-info-title">CONTENT PROVIDER</div>
            <div className="Home-Accounts-info-content"> ● CONTENT PROVIDER INFO</div>

          </section>
          <section className="Home-Accounts-info">
            <div className="Home-Accounts-info-title">ADVERTISER</div>
            <div className="Home-Accounts-info-content">● ADVERTISER INFO</div>

          </section>
          */}
        </section>
      </div> :
      accTypes.includes(this.props.user.type) ?
      <MemberHome/> :
        <div/>
      }
    </main>
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
