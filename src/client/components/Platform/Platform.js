import React, {Component} from 'react';
import {connect} from 'react-redux';


class Platform extends Component {
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
    alert(`${viewer.name} contacted ${this.state.platform.channelName}`);
  }
  render(){
    const selected = {color: 'white', background: 'red', border: '1px solid white'};
    const platform = this.state.platform;
    const viewer = this.props.user;
    console.log(platform);
    return (
      <div className="Platform-item">
        <div className="Platform-tabs">
          <div  className="Platform-tabs-tab"><nobr>{platform.channelID}</nobr></div>
          <div className="Platform-tabs-tab"><nobr>{platform.channelName}</nobr></div>
          <div className="Platform-tabs-tab"><nobr>Subscribers: {platform.subscribers || 0}</nobr></div>
          <div className="Platform-tabs-tab"><nobr>Avg Views: {platform.avgViews || 0}/WEEK</nobr></div>
          <div onClick={() => this.contactUser(viewer)} className="Platform-tabs-contact">CONTACT</div>
        </div>
        <div className="Platform-details">
            <div>{platform.details || "NO DETAILS"}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(Platform);