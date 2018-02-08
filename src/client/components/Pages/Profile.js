import React, { Component } from 'react';
import '../../styles/Profile.css';
import PlatformList from '../Platform/PlatformList';
import ContractList from '../Contracts/ContractList';


export default class Profile extends Component {
  constructor(props){
    super(props);
    this.user = props.user || {name: 'Track Seven Development', type: 'BA', bio: null /*leave null for no bio*/}; 
    this.types = ["BA", "CP"];
  }
  render(){
    const types = this.types;
    const user = this.user;
    if(!types.includes(this.user.type)) return <div className="no_user_data">NO ACCOUNT SET</div>;
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
            {user.type === "BA" ? <div className="Profile-tag">BUSINESS ACCOUNT</div> : user.type === "CP" ? <div className="Profile-tag">CONTENT PROVIDER</div> : <div/>}
            
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
            <div className="Profile-header"> {user.name || "UNTITLED"} </div>
            <div style={!user.bio ? {display: 'none'}:{display: 'flex'}} className="Profile-bio">{user.bio}</div>
            {user.type === "CP" ? <PlatformList /> : user.type === "BA" ? <ContractList /> : <div className="no_user_data">No Data</div>}
          </div>
        </div>
      </div>
    );
  }
}