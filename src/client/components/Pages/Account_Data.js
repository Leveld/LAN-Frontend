import React from 'react';
import OverviewPaneList from '../OverviewPane/OverviewPaneList';
import Timeline from '../Timeline/timeline';
import Scheduler from '../Scheduler/scheduler';
import CampaignList from '../Campaigns/CampaignList';
import '../../styles/MHome.css';
// Graph Pane
import ChartView from '../Charts/ChartView';

const AccountData = (props) => {
  // Compose graph components from data
  // data points, pane items, get it? hehe
  console.log(props);
  const panePoints = props.overviewDataPoints.map(point => {
    const p = {

      dataView: <ChartView type={point.type} data={point.data} />
    };
    if (point.title) p.title = point.title;
    if (point.description) p.description = point.description;
    return p;
  });

  return (
    <div className="M-Home">
    <OverviewPaneList paneList={panePoints} />
    <Timeline chartA="http://www.prodevtips.com/wp-content/uploads/2009/09/flare_timeseries_graph.png" chartB="https://chandoo.org/img/pm/5-intermediate-version-of-timeline-chart.png"/>
    <Scheduler />
    {console.log('props=> ',props)}
    <CampaignList _id={props.owner ? props.owner.ownerID : props._id} type={props.owner ? props.owner.ownerType : props.type}/>
    </div>
  );
};

export default AccountData;
