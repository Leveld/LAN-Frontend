import React, { Component } from 'react';
import '../../styles/Profile.css';
import Platform from '../Platform/PlatformList';


export default class Profile extends Component {
  constructor(props){
    super();
    this.user = props.user;
  }
  render(){
    return (
      <div className="Profile-wrapper">
        <div className="Profile-banner">
          <img src="http://colorfully.eu/wp-content/uploads/2012/10/the-clock-is-ticking-away-facebook-cover.jpg" alt="Cover" height="100%" width="100%"/>
        </div>
        <div className="Profile-content">
          <div className="Profile-content-left">
            <div style={{width: '100%', height: 50, background: 'black', borderBottom: '1px solid white'}}/>
            <div className="Profile-logo">
              <div className="Profile-logo-img"/>
            </div>
            <div className="Profile-contact-list">
              <div className="Profile-message" >
                <div className="disabled">DISABLED</div>
                <div className="Profile-message-btn"> MESSAGE </div>
              </div>
              <div className="Profile-contact" >CONTACT</div>
              <div className="Profile-contact" >CONTACT</div>
              <div className="Profile-contact" >CONTACT</div>
              <div className="Profile-contact" >CONTACT</div>
            </div>
          </div>
          <div className="Profile-content-right">
            <div className="Profile-header">BUSINESS NAME </div>
            <div className="Profile-bio" />
            {this.user === "CP" ? <Platform /> : <div className="Profile-no_user">No User</div>}
          </div>
        </div>
      </div>
    );
  }
}