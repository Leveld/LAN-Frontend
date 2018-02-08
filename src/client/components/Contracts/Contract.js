import React, {Component} from 'react';

export default class Contract extends Component {
  constructor(props){
    super(props);
    this.contract = props.contract;
    this.state = {contract: props.contract};

  }

  componentWillReceiveProps(props){
    this.setState({contract: props.contract});
  }


  render(){
    const title = this.state.contract.title;
    const owner = this.state.contract.owner;
    return (
      <div className="Contract-wrapper">
        <div className="Contract-tabs">
          <div className="Contract-tabs-tab">{title}</div>
          <div className="Contract-tabs-tab">REMAINING</div>
          <div className="Contract-tabs-tab">CPM</div>
          <div className="Contract-tabs-tab">Created By: {owner}</div>
          <div className="Contract-tabs-apply">APPLY</div>
        </div>
      </div>
    );
  } 
}