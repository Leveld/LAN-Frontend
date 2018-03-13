import React, {Component} from 'react';
import axios from 'axios';
import {apiServerIP} from 'capstone-utils';
import {accTypes} from '../../../server/config.json'
import {Link} from 'react-router-dom';
import CampaignStats from '../Campaigns/CampaignStats';


class Search extends Component {
  constructor(props){
    super(props);
    this.state = {users:[], campaigns: [], display: [], type: 'name'};
    this.type = props.type;
    this.convo = props.convo;
  }
  
  componentWillMount(){
    this.convo = this.props.convo;
    //get all users
    this.findUsers();
    this.findCampaigns();
  }

  findUsers = () => {
    axios.get(`${apiServerIP}users`, {headers:{Authorization: window.localStorage.getItem('access_token')}})
    .then((res) => {
      this.setState({users: res.data});
    });
  }

  findCampaigns = async () => {
    //get all campaigns
    let arr;
    const campaigns = await axios.get(`${apiServerIP}campaigns`, {headers:{Authorization: window.localStorage.getItem('access_token')}});
    if (campaigns.data) arr = await campaigns.data.map(async (campaign) => {
      const user = await axios.get(`${apiServerIP}user?id=${campaign.owner.ownerID}&type=${campaign.owner.ownerType}`, {headers:{Authorization: window.localStorage.getItem('access_token')}});
      if(user.data) return campaign.owner.ownerName = await user.data.businessName;
    });
    await this.setState({campaigns: campaigns.data});
  }

  filter = (input) => {
    if(input === "") return this.setState({display: []});
    
    if(this.state.type === 'industry'){
      const filtered = this.state.campaigns.filter((campaign) => campaign.preferredApplicant ? String(campaign.preferredApplicant.industry).toLocaleLowerCase().startsWith(input.toLocaleLowerCase()) : null);
    this.setState({display: filtered});
    } else {
      const filtered = this.state.users.filter((user) => String(user[this.state.type]).toLocaleLowerCase().startsWith(input.toLocaleLowerCase()));
      this.setState({display: filtered});
    }
  }

  render() {
    return this.type === 'main' ?
    (
      <div className="search-bar" style={{display: 'flex', flexDirection: 'column' }}>
      <div style={{display: 'flex', flexDirection:'row', flex: 1, fontSize: '0.5rem'}}>
        <select onChange={(e)=> this.setState({type: e.target.value, display: []})} style={{flex:1, outline: 'none', border: '1px solid black', cursor: 'pointer', color: 'white', fontWeight: 700, background: "rgb(47, 150, 103)"}}>
          <option value="name">NAME</option>
          <option value="id">ID</option>
          <option value="type">TYPE</option>
          <option value="industry">INDUSTRY</option>
        </select>
        
        <input name="search" autoComplete="off"  onChange={(e)=> this.filter(e.target.value)} type="text" style={{width: '90%', fontSize: '1rem', background: "rgb(47, 150, 103)",border: '1px solid black', outline: 'none', color: 'white', fontWeight: 700}}/>
        
        </div>

          {this.state.type !== 'industry' && this.state.display.length ? this.state.display.map((user, i) => <Link onClick={() => this.setState({display: []})} key={i} to={`/profile?id=${user.id}&type=${user.type}`} style={{textDecoration: 'none', background: '#171738', color: 'white', margin: 5, padding: 10}}>[{user.type === accTypes[0] ? 'BA' : user.type === accTypes[1] ? 'CP' : null}] {user.name}</Link>) : null}
          {this.state.type === 'industry' && this.state.display.length ? this.state.display.map((campaign, i) => <Link onClick={() => this.setState({display: []})} key={i} to={`/profile?id=${campaign.owner.ownerID}&type=${campaign.owner.ownerType}`} style={{textDecoration: 'none', background: '#171738', color: 'white', margin: 5, padding: 10}}>{campaign.preferredApplicant.industry} - {campaign.owner.ownerName}</Link>) : null}
        
      </div>
    ) :
    this.type === 'messenger' ?
    (<div className="search-bar" style={{display: 'flex', flexDirection: 'column' }}>
    <div style={{display: 'flex', flexDirection:'row', flex: 1, fontSize: '0.5rem'}}>
      <select onChange={(e)=> this.setState({type: e.target.value, display: []})} style={{flex:1}}>
        <option value="name">NAME</option>
        <option value="id">ID</option>
        <option value="type">TYPE</option>
      </select>
      
      <input name="search"  onChange={(e)=> this.filter(e.target.value)} type="text" style={{width: '90%', fontSize: '1rem'}}/>
      </div>
      
      {this.state.type !== 'industry' && this.state.display.length && this.type === 'messenger' ? this.state.display.map((user, i) => 
      <div onClick={() => this.addtoconvo(user.id)} key={i} style={{textDecoration: 'none', marginLeft: 5}}>{user.name} - {user.type}</div>) : null}
    </div>)
    :
    <div/>
  }
}

export default Search;
