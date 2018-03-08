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
  title: 'Ad Views',
  description: 'The number of ad views per week',
  type: 'Line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'],
    datasets: [{
      label: 'Number of Clicks',
      data: [128, 219, 193, 285, 302, 389, 328, 419, 493, 485, 502, 589],
      backgroundColor: [
        'rgb(103,89,122,0.5)'
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
  const t = [
    {
      title: 'Number of Impressions',
      description: 'The number of impressions per week',
      type: 'Bar',
      data: {
        labels: ['Jan 1 2018', 'Jan 8 2018', 'Jan 15 2018', 'Jan 22 2018', 'Jan 29 2018', 'Feb 5 2018','Feb 12 2018', 'Feb 19 2018', 'Feb 26 2018', 'Mar 5 2018'],
        datasets: [{
          label: '# of Impressions',
          data: [275, 285, 302, 340, 328, 360, 400, 430, 452, 475],
          backgroundColor: [
            'rgb(103,89,122,0.8)',
            'rgb(103,89,122,0.8)',
            'rgb(103,89,122,0.8)',
            'rgb(103,89,122,0.8)',
            'rgb(103,89,122,0.8)',
            'rgb(103,89,122,0.8)',
            'rgb(103,89,122,0.8)',
            'rgb(103,89,122,0.8)',
            'rgb(103,89,122,0.8)',
            'rgb(103,89,122,0.8)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Number of Impressions'
            }
          }]
        }  
     }
    },
    {
      title: 'Cost per thousand impressions ',
      description: 'The cost per thousand impressions per week',
      type: 'Line',
      data: {
        labels: ['Jan 1 2018', 'Jan 8 2018', 'Jan 15 2018', 'Jan 22 2018', 'Jan 29 2018', 'Feb 5 2018','Feb 12 2018', 'Feb 19 2018', 'Feb 26 2018',  'Mar 5 2018'],
        datasets: [{
          label: 'CPM',
          data: [2.05, 1.99, 1.95, 1.97, 1.90, 1.82, 1.85, 1.77, 1.72, 1.70],
          backgroundColor: [
            'rgb(23,23,56,0.8)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
     }
    },
  ];
// ['Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec','Jan', 'Feb', 'Mar']
  

  const panePoints = t.map(point => {
    const p = {

      dataView: <ChartView type={point.type} data={point.data} options={{responsive: true}} />
    };
    if (point.title) p.title = point.title;
    if (point.description) p.description = point.description;
    return p;
  });

  return (
    <div className='M-Home'>
    <OverviewPaneList paneList={panePoints} />
    {/*<OverviewPane title='Ad Views' dataView={<ChartView type={timelineData.type} data={timelineData.data} options={timelineData.options} />} /> */}
    {/*<Timeline chartA='http://www.prodevtips.com/wp-content/uploads/2009/09/flare_timeseries_graph.png' chartB='https://chandoo.org/img/pm/5-intermediate-version-of-timeline-chart.png'/>*/}
    <Scheduler />
    {console.log('props=> ',props)}
    <CampaignList _id={props.owner ? props.owner.ownerID : props._id} type={props.owner ? props.owner.ownerType : props.type}/>
    </div>
  );
};

export default AccountData;
