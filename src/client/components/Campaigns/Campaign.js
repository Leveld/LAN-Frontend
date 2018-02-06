import React, {Component} from 'react';

export default class Campaign extends Component {
  constructor(props){
    super(props);
    this.id = props.id;
    this.title = props.title;
  }
  render(){
    return (
      <div className="Campaign-item">
        <div className="Campaign-item-id">{this.id}</div>
        <div className="Campaign-item-title">{this.title}</div> 
      </div>
    )
  }
}