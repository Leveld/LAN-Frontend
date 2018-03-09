import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setCurrentEvent} from '../../actions';

class Evnt extends Component {
  constructor(props){
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.details = props.details;
    this.day = props.day;
  }
  render(){

    return (
      <div className="schedule-event" onClick={()=>{this.props.setCurrentEvent({id: this.id, name: this.name, details:this.details, day: this.day })}}>
        <div className="schedule-event-id">{this.id}</div><div className="Scheduler-event-name">{this.name}</div>
      </div>
    );
  }
}


export default connect(null, {setCurrentEvent})(Evnt);
