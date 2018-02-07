import React, {Component} from 'react';

export default class Platform extends Component {
  constructor(props){
    super(props);
    this.state = {platform: props.platform, selected: 0};
  }
  componentWillReceiveProps(props){
    this.setState({platform: props.platform});
  }
  render(){
    const selected = {color: 'white', background: 'red', border: '1px solid white'};
    return (
      <div className="Platform-item">
        <div className="Platform-tabs">
          <div onClick={() => this.setState({selected: 0})} style={this.state.selected === 0 ? selected : {color: 'black'}} className="Platform-tabs-tab">PLATFORM</div>
          <div onClick={() => this.setState({selected: 1})} style={this.state.selected === 1 ? selected : {color: 'black'}} className="Platform-tabs-tab">USERNAME</div>
          <div onClick={() => this.setState({selected: 2})} style={this.state.selected === 2 ? selected : {color: 'black'}} className="Platform-tabs-tab">SUBSCRIBERS</div>
          <div onClick={() => this.setState({selected: 3})} style={this.state.selected === 3 ? selected : {color: 'black'}} className="Platform-tabs-tab">AVG VIEWS</div>
          <div onClick={() => this.setState({selected: 4})} style={this.state.selected === 4 ? selected : {color: 'black'}} className="Platform-tabs-tab">CONTACT</div>
        </div>
        <div className="Platform-details">
          {this.state.selected === 0 ?
            <div>PLATFORM {this.state.platform.name.toUpperCase()} DETAILS</div> :
          this.state.selected === 1 ?
            <div>USERNAME DETAILS</div> :
          this.state.selected === 2 ?
            <div>SUBSCRIBERS DETAILS</div> :
          this.state.selected === 3 ?
            <div>AVG VIEWS DETAILS</div> :
          this.state.selected === 4 ?
            <div>CONTACT DETAILS</div> :
          this.setState({selected: 0})
          }
        </div>
      </div>
    );
  }
}