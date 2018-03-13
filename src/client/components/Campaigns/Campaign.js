import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {accTypes} from '../../../server/config.json';
import axios from 'axios';
import {apiServerIP} from '../../../server/config.json';

export default class Campaign extends Component {
  constructor(props){
    super(props);
    this.state = {join: false, outlet: null}
    this.id = props.data.id;
    this.description = props.data.description;
    this.category = props.data.preferredApplicant.industry;
    this.status = props.data.status;
    this.coType = props.data.preferredApplicant.coType;
    this.userID = props.data.owner.ownerID;
    this.user = props.user;
  }
  componentWillMount() {
    this.user = this.props.user;
    this.setState({outlet: this.user.type === accTypes[1] ? this.user.contentOutlets[0] : []});
  }
  join = () => {
    if(this.state.join){
      console.log(this.state.outlet);
      alert(`${this.state.outlet.channelName} joined (Theoretically)`); //GOING TO SLEEP
    };
    return this.setState({join: !this.state.join})
  }
  render(){
    return (
      <div className="pane campaign-item">
        
        <a name={this.id}></a>
        <p><span className="campaign-item--label">Industry:</span> {this.category}</p>
        <p><span className="campaign-item--label">Status:</span> {this.status}</p>
        <p><span className="campaign-item--label">Content Outlet Type:</span> {this.coType}</p>
        <p style={{marginBottom: '1rem'}} ><span className="campaign-item--label">Description:</span> {this.description}</p>
        {this.user.type === accTypes[1] ? <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          
            <select onChange={(e) => this.setState({outlet:JSON.parse(e.target.value)})} className="transisiton--opacity" style={this.state.join ? {width: 100, opacity: 1} : {width: 0, opacity: 0}}>
              {this.user.contentOutlets.map((outlet, i) => <option key={i} value={JSON.stringify(outlet)}>{outlet.channelName}</option>)}
            </select>
            
          
          {
            !window.location.href.split('/')[3].toLowerCase().startsWith('profile') || !window.location.href.split('/')[3].split('=')[1] === this.userID ?
                <Link className="button button--color-green" to={`/profile?id=${this.userID}&type=Business#${this.id}`}>View Creator's Profile</Link> 
            : <button onClick={() => this.join()} className="button button--color-green "> JOIN </button> 
          }
          {
            this.state.join ?
            <button className="button transisiton--opacity" onClick={() => this.setState({join: false})} style={{background: 'red', color: 'white'}}> CANCEL </button> :
            null
          }
        </div>
        : null}
      </div>
    )
  }
}
