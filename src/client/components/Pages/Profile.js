import React, { Component } from 'react';
//import '../../styles/Profile.css';
import PlatformList from '../Platform/PlatformList';
import ContractList from '../Contracts/ContractList';
import {frontServerIP, apiServerIP} from 'capstone-utils';
import {accTypes} from '../../../server/config.json';
import {connect} from 'react-redux';
import axios from 'axios';
import {Cookies} from 'react-cookie';
const cookie = new Cookies();


class Profile extends Component {
  constructor(){
    super();
    this.state = {user: null};
  }

  componentDidMount(){
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id');
    const type = params.get('type');
    const token = window.localStorage.getItem('access_token') || cookie.get('access_token');
    axios.get(`${apiServerIP}user?id=${id}&type=${type}`, {headers:{Authorization: token}})
    .then((res) => this.setState({user: res.data}))
    .catch((err) => console.log(err));
  }

  render(){
    const user = this.state.user;
    if(!this.props.authenticated || !user) return <div className="Error-wrapper" />;
    
   if(!user.type) return <div className="Error-wrapper"/>
   if(!accTypes.includes(user.type)) return (
    <div>
      <div className="no_user_data">
        NO ACCOUNT SET
      </div>
    </div>
 );
    return (
      <div className="Profile-wrapper">
        <div className="Profile-content">
          <div className="Profile-content-left">
            <div className="Profile-logo">
              <div className="Profile-logo-img">
                <img src={this.state.user.profilePicture || 'images/noPhoto.jpg'} width="100%"/>
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
            {
              this.state.user.coverPicture ?
                <div className="Profile-banner">
                  <img src={this.state.user.coverPicture} alt="Cover" height="100%" width="100%"/> 
                </div> 
              : null
            }
            <div style={!user.bio ? {display: 'none'}:{display: 'flex'}} className="Profile-bio">{user.bio}</div>
            {user.type === accTypes[1] ? <PlatformList list={user.contentOutlets || []}/> : user.type === accTypes[0] ? <ContractList /> : <div className="no_user_data">No Data</div>}
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

export default connect(mapStateToProps, null)(Profile);