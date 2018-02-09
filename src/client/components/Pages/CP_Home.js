import React, {Component} from 'react';
import OverviewPaneList from '../OverviewPane/OverviewPaneList';
import Timeline from '../Timeline/timeline';
import Scheduler from '../Scheduler/scheduler';
import CampaignList from '../Campaigns/CampaignList';
import '../../styles/CP-Home.css';
import {connect} from 'react-redux';

class CPHome extends Component {
  constructor(props){
    super(props);
    this.user = props.user || {type: "contentproducer"};
    this.types = ['business','contentproducer'];
  }
  componentWillMount(){
    if(!this.props.authenticated) return window.location.replace('/error?m=NOT AUTHENTICATED');    
    
  }
  render(){
    if(this.user.type !== this.types[1] || !this.props.authenticated) return <div />;
    
    if(!this.types.includes(this.user.type)) return <div className="no_user">NO ACCOUNT SET</div>;
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
    authenticated: state.auth
  };
};

export default connect(mapStateToProps, null)(CPHome);