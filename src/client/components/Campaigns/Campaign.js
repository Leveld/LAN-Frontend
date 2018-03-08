import React, {Component} from 'react';

export default class Campaign extends Component {
  constructor(props){
    super(props);
    this.id = props.data.id;
    this.description = props.data.description;
    this.category = props.data.preferredApplicant.industry;
    this.status = props.data.status;
    this.coType = props.data.preferredApplicant.coType;
  }
  render(){
    return (
      <div className="campaign-item">
        // <div className="Campaign-item-id">{this.id}</div>
        <div className="Campaign-item-title">{this.description}</div>
        <div className="Campaign-item-category">{this.category}</div>
        <div className="Campaign-item-status">{this.status}</div>
        <div className="Campaign-item-coType">{this.coType}</div>
      </div>
    )
  }
}
