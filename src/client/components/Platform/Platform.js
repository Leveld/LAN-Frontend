import React, {Component} from 'react';

export default class Platform extends Component {
  constructor(props){
    super(props);
    this.state = {platform: props.platform, selected: 0};
  }
  componentWillReceiveProps(props){
    this.setState({platform: props.platform});
  }
  contactUser = (viewer) => {
    if(!viewer) return alert("NOT SIGNED IN")
    //Contact Content Provider about this Platfom
    alert(`${viewer} contacted ${this.state.platform.username}`);
  }
  render(){
    const selected = {color: 'white', background: 'red', border: '1px solid white'};
    const platform = this.state.platform;
    const viewer = window.localStorage.getItem('username');
    return (
      <div className="Platform-item">
        <div className="Platform-tabs">
          <div className="Platform-tabs-tab">{platform.status}</div>
          <div className="Platform-tabs-tab">{platform.username}</div>
          <div className="Platform-tabs-tab">{platform.subscribers}</div>
          <div className="Platform-tabs-tab">{platform.avgViews}/WEEK</div>
          <div onClick={() => this.contactUser(viewer)} className="Platform-tabs-contact">CONTACT</div>
        </div>
        <div className="Platform-details">
            <div>{platform.details}</div>
        </div>
      </div>
    );
  }
}