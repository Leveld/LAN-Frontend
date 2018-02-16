import React from 'react';
import OverviewPaneList from '../OverviewPane/OverviewPaneList';
import Timeline from '../Timeline/timeline';
import Scheduler from '../Scheduler/scheduler';
import CampaignList from '../Campaigns/CampaignList';
import '../../styles/MHome.css';

const AccountData = () => {
  return (
    <div className="M-Home">
    <OverviewPaneList />
    <Timeline chartA="http://www.prodevtips.com/wp-content/uploads/2009/09/flare_timeseries_graph.png" chartB="https://chandoo.org/img/pm/5-intermediate-version-of-timeline-chart.png"/>
    <Scheduler />
    <CampaignList />
    </div>
  );
};

export default AccountData;