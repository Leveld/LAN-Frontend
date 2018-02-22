import React, {Component} from 'react';
import Campaign from './Campaign';
import CampaignStats from './CampaignStats';
import CampaignAdd from '../Campaigns/CampaignAdd';
import {accTypes} from '../../../server/config.json';
import {connect} from 'react-redux';
import '../../styles/Campaigns.css';

 class CampaignList extends Component {
  constructor(props){
    super(props);
    this.state = {form: false, owner: props._id, type: props.type};
    this.list = props.list || /*MOCK DATA*/ [];
    this.type = props.type;
  }

  componentWillReceiveProps = (props) => {
    this.setState({owner: props._id, type: props.type});
  }

  toggleForm = () => this.setState({form: !this.state.form});

  render(){
    return (
      <div className="Campaign-list">
        {this.state.form ? <CampaignAdd parent={this}/> : null}
        <div className="Campaign-header"> CAMPAIGNS </div>
        {this.state.type === accTypes[0] && this.state.owner === this.props.user._id ? <div style={{width: '100%', display: 'flex', padding: '1% 0', justifyContent: 'flex-end', marginRight: '1%',  background: 'rgb(57,57,57)'}}><button style={{cursor: 'pointer'}} onClick={()=>this.toggleForm()}>Add Campaign</button></div> : null}
          <div className="Campaign-wrapper">
            {this.list.length === 0 ? <div style={{color: 'white', padding: '1% 0'}}>NO CAMPAIGNS</div> : null} 
            {this.list.map((campaign, i) => {
              return <Campaign key={i} id={i+1} title={`${campaign.title} ${i+1}`} />
            })}
          </div>
          <CampaignStats />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps, null)(CampaignList);