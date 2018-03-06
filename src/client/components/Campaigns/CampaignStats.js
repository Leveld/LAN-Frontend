import React, {Component} from 'react';
import '../../styles/Campaigns.css'

export default class CampaignStats extends Component {
  render() {
    return (
      <div className="Campaign-stats">
        <div className="Campaign-stats-wrapper">
          <div className="Campaign-header">CAMPAIGN STATS</div>
          <div>
            <div className="Campaign-stat"/>
            <div className="Campaign-stat"/>
            <div className="Campaign-stat"/>
          </div>
        </div>
      </div>
    );
  }
}