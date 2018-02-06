import React, {Component} from 'react';
import Campaign from './Campaign';
import CampaignStats from './CampaignStats';
import '../../styles/Campaigns.css';

export default class CampaignList extends Component {
  constructor(props){
    super(props);
    this.list = props.list || /*MOCK DATA*/ [{title: "Campaign"},{title: "Campaign"},{title: "Campaign"},{title: "Campaign"},{title: "Campaign"},{title: "Campaign"},{title: "Campaign"},{title: "Campaign"},{title: "Campaign"}];
  }
  render(){
    return (
      <div className="Campaign-list">
        <div className="CP-home-header"> CAMPAIGNS </div>
          <div className="Campaign-wrapper">
            {this.list.map((campaign, i) => {
              return <Campaign key={i} id={i+1} title={`${campaign.title} ${i+1}`} />
            })}
          </div>
          <CampaignStats />
      </div>
    );
  }
}