import React, {Component} from 'react';
import OverviewPaneList from '../OverviewPane/OverviewPaneList';
import Timeline from '../Timeline/timeline';
import Scheduler from '../Scheduler/scheduler';
import CampaignList from '../Campaigns/CampaignList';
import '../../styles/CP-Home.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {accTypes} from '../../../server/config.json';
import {Cookies} from 'react-cookie';
const cookie = new Cookies();

class CPHome extends Component {

  render(){
    if(this.props.user.type !== accTypes[1] || !this.props.authenticated || !cookie.get('access_token')) return <div />;
    
    if(!accTypes.includes(this.props.user.type)) return <div className="no_user">NO ACCOUNT SET</div>;
    return ( 
      <div className="CP-Home">
        <OverviewPaneList />
        <Timeline chartA="http://www.prodevtips.com/wp-content/uploads/2009/09/flare_timeseries_graph.png" chartB="https://chandoo.org/img/pm/5-intermediate-version-of-timeline-chart.png"/>
        <Scheduler />
        <CampaignList />
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

export default connect(mapStateToProps, null)(CPHome);