import React, {Component} from 'react';
import axios from 'axios';
import Campaign from './Campaign';
import CampaignStats from './CampaignStats';
import CampaignAdd from '../Campaigns/CampaignAdd';
import {apiServerIP} from 'capstone-utils';
import {accTypes} from '../../../server/config.json';
import {connect} from 'react-redux';
//import '../../styles/Campaigns.css';

 class CampaignList extends Component {
  constructor(props){
    super(props);
    this.state = {form: false,
                  owner: props._id,
                  type: props.type,
                  campaigns: []
                 };
    //this.list = props.list || /*MOCK DATA*/ [];
    this.type = props.type;
    this.token = window.localStorage.getItem('access_token') || cookie.get('access_token');
  }

  componentDidMount() {
   let campaigns = axios.get(`${apiServerIP}campaigns`, {headers: {Authorization: `Bearer ${this.token}`}})
       .then((campaigns) => {
       if(campaigns)
       campaigns = campaigns.data.filter(camp => camp.owner.ownerID === this.props.user._id);
     this.setState({ campaigns })
   })
   .catch((err) => {
     console.log(err);
   });
  }

  componentWillReceiveProps = (props) => {
    this.setState({owner: props._id, type: props.type});
  }

  toggleForm = () => this.setState({form: !this.state.form});

  render() {
    return (
      <div className="pane pane-campaign">
        {this.state.form ? <CampaignAdd parent={this}/> : null}
        <h3 className="campaign--header"> Campaigns </h3>
          <div className='campaign-list'>
            {this.state.campaigns.length === 0 ? <div>NO CAMPAIGNS</div> : null}
            {this.state.campaigns.map((campaign, i) => { return <Campaign key={i} id={i+1} data={campaign} title={`${campaign.title} ${i+1}`} /> })}
          </div>
          {this.state.type === accTypes[0] && this.state.owner === this.props.user._id ? <button className="campaign--add" onClick={()=>this.toggleForm()}>Add A New Campaign</button> : null}
          {/*<CampaignStats />*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {user: state.user };
};

export default connect(mapStateToProps, null)(CampaignList);
