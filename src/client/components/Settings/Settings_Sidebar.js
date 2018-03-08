import React, {Component} from 'react';
//import '../../styles/Settings.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {apiServerIP} from 'capstone-utils';
import axios from 'axios';
import {toggleSettings} from '../../actions';
import {Cookies} from 'react-cookie';
const cookie = new Cookies();

const SettingsItem = (props) => {
  return (
    <div className="Settings-block-item">
      {props.blob}
    </div>
  );
};

const SettingsBlock = (props) => {
  const blockItems = props.data || [0,0];
  return (
    <div className="Settings-block">
      <div>{props.title}</div>
      {
        blockItems.map((item, i) => <SettingsItem key={i} blob={item} />)
      }
    </div>
  );
}

class SettingsSidebar extends Component {
  updateSettings = (e) => {
    e.preventDefault();
    //UJPDATE SETTINGG
  }

  

  findSettings = (settings) => {
    let blob;
    const settingsKeys = Object.keys(settings);
    const settingsValues = Object.values(settings);
    if(this.props.user)
    blob = (
      <form onSubmit={(e)=>this.updateSettings(e)}>
        {settingsKeys.map((key, i) => { 
          return (
            <div key={i}>
              <div>
                {String(key).toUpperCase()}:
              </div> 
              <div>
                <select name={key}>
                  <option value={settingsValues[i]}>{String(settingsValues[i])}</option>
                  <option value={!settingsValues[i]}>{String(!settingsValues[i])}</option>
                </select>
              </div>
            </div>
          );
        })}
        <div> 
          <input type="submit" value="UPDATE"/>
        </div>
      </form>
    );

    return blob;
  }
  render(){
    let userSettings;
    userSettings = {
      showAge: false,
      showContactEmail: false,
      showEmail: false,
      showFacebook: false,
      showGender: false,
      showGooglePlus: false,
      showLinkedIn: false,
      showPhoneNumber: false,
      showTwitter: false
    };
    this.props.user.settings ? userSettings = this.props.user.settings : null;    

    const blocks = [
      {title: 'SETTINGS', data: [this.findSettings(userSettings)]}
    ];

    if(!this.props.authenticated) return <div />;
    
    return (
      <div className="Settings-sidebar" style={this.props.settings ? {width:250} : {width: 0}}>
        <Link onClick={()=>this.props.toggleSettings()} className="Settings-profile" to={`/profile?id=${this.props.user._id}&type=${this.props.user.type}`}>VIEW PROFILE</Link>
        {
          blocks.map((block, i) => <SettingsBlock key={i} title={block.title} data={block.data}/>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
 return {
    authenticated: state.auth,
    user: state.user,
    settings: state.settings
  }
}

export default connect(mapStateToProps, {toggleSettings})(SettingsSidebar);
