import React, { Component } from 'react';
import '../../styles/Profile.css';
import PlatformList from '../Platform/PlatformList';
import ContractList from '../Contracts/ContractList';
import {frontServerIP} from 'capstone-utils';
import {accTypes} from '../../../server/config.json';
import {connect} from 'react-redux';


class Profile extends Component {

  render(){
    const user = this.props.user;
    if(!this.props.authenticated || !user) return <div className="Error-wrapper" />;
    
   if(!user.type) return <div className="Error-wrapper"/>
   if(!accTypes.includes(user.type)) return (
    <div style={{width: "100%", height:'100%', background: 'grey', display:'flex', justifyContent: 'center', }}>
      <div className="no_user_data">
        NO ACCOUNT SET
      </div>
    </div>
 );
    return (
      <div className="Profile-wrapper">
        
        <div className="Profile-content">
          <div className="Profile-content-left">
            <div style={{width: '100%', height: 50, background: 'black', borderBottom: '1px solid white'}}/>
            <div className="Profile-logo">
              <div className="Profile-logo-img">
                <img src={`${frontServerIP}images/${user.email/* JWT TOKEN NAME*/}/profile.jpg`} onError={(e) => e.target.src = 'images/noPhoto.jpg'} width="100%"/>
              </div>
            </div>
            <div className="Profile-contact-list">
            {user.type === accTypes[0] ? <div className="Profile-tag">BUSINESS ACCOUNT</div> : user.type === accTypes[1] ? <div className="Profile-tag">CONTENT PROVIDER</div> : <div/>}
            
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
            <div className="Profile-header"> {user.type === accTypes[0] ? user.businessName : user.name || "UNTITLED"} </div>
            <div className="Profile-banner">
              <img src="http://colorfully.eu/wp-content/uploads/2012/10/the-clock-is-ticking-away-facebook-cover.jpg" alt="Cover" height="100%" width="100%"/>
            </div>
            <div style={!user.bio ? {display: 'none'}:{display: 'flex'}} className="Profile-bio">{user.bio}</div>
            {user.type === accTypes[1] ? <PlatformList /> : user.type === accTypes[0] ? <ContractList /> : <div className="no_user_data">No Data</div>}
          </div>
        </div>
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

export default connect(mapStateToProps, {})(Profile);