import React, {Component} from 'react';
import '../../styles/Settings.css';
import {connect} from 'react-redux';

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
      <div style={{width: '100%', textAlign: 'center', color: 'white', background: 'black', borderBottom: '1px solid green'}}>{props.title}</div>
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
      <form onSubmit={(e)=>this.updateSettings(e)} style={{width: 250, display: 'flex', flexDirection: 'column', borderBottom: '1px solid white' }}>
        {settingsKeys.map((key, i) => { 
          return (
            <div key={i} style={{width: '100%', display: 'flex', background: 'red', flexDirection: 'row'}}>
              <div style={{flex:1, fontSize: '1vw', display: 'flex', alignItems: 'center', background: 'rgb(39,69,100)', color: 'white',borderRight:'1px solid black', borderBottom: '1px solid black', paddingLeft: 5}}>
                {String(key).toUpperCase()}:
              </div> 
              <div style={{ borderBottom: '1px solid black', background: 'rgb(49,49,49)', textAlign: 'right', padding: '0 20px'}}>
                <select name={key}>
                  <option value={settingsValues[i]}>{String(settingsValues[i])}</option>
                  <option value={!settingsValues[i]}>{String(!settingsValues[i])}</option>
                </select>
              </div>
            </div>
          );
        })}
        <div style={{display:'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 5, fontSize: 5, background: 'rgb(57,57,57)'}}> 
          <input style={{cursor: 'pointer'}} type="submit" value="UPLOAD"/>
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
    
    return (
      <div className="Settings-sidebar" style={this.props.toggle ? {width:250} : {width: 0}}>
        {
          blocks.map((block, i) => <SettingsBlock key={i} title={block.title} data={block.data}/>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
 return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(SettingsSidebar);
