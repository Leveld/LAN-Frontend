import React, {Component} from 'react';
import Campaign from './Campaign';
import CampaignStats from './CampaignStats';
import CampaignAdd from '../Campaigns/CampaignAdd';
import {accTypes} from '../../../server/config.json';
import {connect} from 'react-redux';
//import '../../styles/Campaigns.css';

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
        {this.state.type === accTypes[0] && this.state.owner === this.props.user._id ? 
<<<<<<< HEAD
        <div style={{width: '100%', display: 'flex', padding: '1% 0', justifyContent: 'flex-end', paddingRight: '1%',  background: 'rgb(57,57,57)'}}>
        <button className="App-auth-link" style={{fontSize: '12px'}} onClick={()=>this.toggleForm()}>Add Campaign</button></div> : null}
=======
        <div>
        <button className="App-auth-link" onClick={()=>this.toggleForm()}>Add Campaign</button></div> : null}
>>>>>>> 7e9ff17d03da2a768e33445fb4c28e9abb6c5951
          <div className="Campaign-wrapper">
            {this.list.length === 0 ? <div>NO CAMPAIGNS</div> : null} 
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