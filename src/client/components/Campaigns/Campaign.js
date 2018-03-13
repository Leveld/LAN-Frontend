import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Campaign extends Component {
  constructor(props){
    super(props);
    this.id = props.data.id;
    this.description = props.data.description;
    this.category = props.data.preferredApplicant.industry;
    this.status = props.data.status;
    this.coType = props.data.preferredApplicant.coType;
    this.userID = props.data.owner.ownerID;
  }
  render(){
    return (
      <div className="pane campaign-item">
        <a name={this.id}></a>
        <p><span className="campaign-item--label">Industry:</span> {this.category}</p>
        <p><span className="campaign-item--label">Status:</span> {this.status}</p>
        <p><span className="campaign-item--label">Content Outlet Type:</span> {this.coType}</p>
        <p style={{marginBottom: '1rem'}} ><span className="campaign-item--label">Description:</span> {this.description}</p>
        {
          !window.location.href.split('/')[3].toLowerCase().startsWith('profile') ?
            <Link className="button button--color-green" to={`/profile?id=${this.userID}&type=Business#${this.id}`}>View Creator's Profile</Link> 
          : null
        }
      </div>
    )
  }
}
