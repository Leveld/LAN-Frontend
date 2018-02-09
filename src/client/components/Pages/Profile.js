import React, { Component } from 'react';
import '../../styles/Profile.css';
import PlatformList from '../Platform/PlatformList';
import ContractList from '../Contracts/ContractList';
import {dbServerIP} from '../../../server/util';
import {connect} from 'react-redux';

const serverIP = dbServerIP;

class Profile extends Component {
  constructor(props){
    super(props);
    this.types = ['business', 'contentproducer'];
  }
  componentWillMount(){
    if(window.localStorage.getItem('authenticated') == 0) window.location.replace('/error?m=NOT AUTHENTICATED'); //SEND TO AUTH0       
  }
  render(){
    const types = this.types;
    const user = this.props.user;
    
    console.log(user.type);
    if(!this.props.authenticated) return <div className="Error-wrapper" />;
    
   if(!user.type) return <div className="Error-wrapper"/>
   user.type = user.type.toLowerCase();  
   if(!types.includes(user.type)) return (
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
                <img src={`${serverIP}images/${user.email/* JWT TOKEN NAME*/}/profile.jpg`} onError={(e) => e.target.src = 'images/noPhoto.jpg'} width="100%"/>
              </div>
            </div>
            <div className="Profile-contact-list">
            {user.type === 'business' ? <div className="Profile-tag">BUSINESS ACCOUNT</div> : user.type === types[1] ? <div className="Profile-tag">CONTENT PROVIDER</div> : <div/>}
            
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
            <div className="Profile-header"> {user.type === 'business' ? user.businessName : user.name || "UNTITLED"} </div>
            <div className="Profile-banner">
              <img src="http://colorfully.eu/wp-content/uploads/2012/10/the-clock-is-ticking-away-facebook-cover.jpg" alt="Cover" height="100%" width="100%"/>
            </div>
            <div style={!user.bio ? {display: 'none'}:{display: 'flex'}} className="Profile-bio">{user.bio}</div>
            {user.type === types[1] ? <PlatformList /> : user.type === types[0] ? <ContractList /> : <div className="no_user_data">No Data</div>}
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