import React from 'react';
import OverviewPaneList from '../OverviewPane/OverviewPaneList';
import Timeline from '../Timeline/timeline';
import Scheduler from '../Scheduler/scheduler';
import CampaignList from '../Campaigns/CampaignList';
//import '../../styles/MHome.css';
// Graph Pane
import ChartView from '../Charts/ChartView';
import OverviewPane from '../OverviewPane/OverviewPane';

const timelineData = {
  title: 'Generated with title',
  description: 'bananas sold to potatoes',
  type: 'Line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'],
    datasets: [{
      label: 'Number of Clicks',
      data: [345, 219, 193, 453, 302, 389],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true
  }
};

const AccountData = (props) => {
  // Compose graph components from data
  // data points, pane items, get it? hehe
  console.log(props);
  const t = [
    {
      title: 'Generated with title',
      description: 'bananas sold to potatoes',
      type: 'Bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    }
  ];
  const panePoints = t.map(point => {
    const p = {

      dataView: <ChartView type={point.type} data={point.data} />
    };
    if (point.title) p.title = point.title;
    if (point.description) p.description = point.description;
    return p;
  });

  return (
    <div className='M-Home'>
    <OverviewPaneList paneList={panePoints} />
    <OverviewPane title='Timeline' dataView={<ChartView type={timelineData.type} data={timelineData.data} options={timelineData.options} />} />
    <Timeline chartA='http://www.prodevtips.com/wp-content/uploads/2009/09/flare_timeseries_graph.png' chartB='https://chandoo.org/img/pm/5-intermediate-version-of-timeline-chart.png'/>
    <Scheduler />
    {console.log('props=> ',props)}
    <CampaignList _id={props.owner ? props.owner.ownerID : props._id} type={props.owner ? props.owner.ownerType : props.type}/>
    </div>
  );
};

export default AccountData;
