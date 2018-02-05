import React, {Component} from 'react';
import '../../styles/Scheduler.css';
import {connect} from 'react-redux';
import {setCurrentEvent} from '../../actions';
import Evnt from './event';


class Scheduler extends Component {
  constructor(props){
    super(props);
    const event1 = {day:'SUNDAY', name:'sunday', details: "These are the details1" };
    const event2 = {day:'FRIDAY', name:'friday', details: "These are the details2" };
    const event3 = {day:'TUESDAY', name:'tuesday', details: "THIS IS A VERY LONG MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, " };
    this.events = props.events || [event1, event2, event2, event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3];
  }

  findEvents = (day) => {
    if(!this.events) return <div> NO EVENTS </div>;
    const events = this.events.filter((e) => e.day === day);
  if(events.length === 0) return <div style={{marginTop:'5%'}}>NO EVENTS</div>;
    return events.map((evt, i) => {
        if(evt.day === day) return <Evnt actions={this.props} key={i} id={i+1} day={evt.day} name={evt.name}  details={evt.details}/>;
        return;
    });
  }

  render(){
    return (
      <div style={{width: '100%', height: '300px', display: 'flex', flexDirection: 'column'}}>
        <div className="CP-home-header">SCHEDULER</div>
        <div className="Scheduler-wrapper">
          <div className="Scheduler-week">
            <div className="Scheduler-day" >
              <div className="Scheduler-day-title">SUNDAY</div>
              <div className="Scheduler-events" >
                {this.findEvents('SUNDAY')}
              </div>
            </div>
            <div className="Scheduler-day" >
              <div className="Scheduler-day-title">MONDAY</div>
              <div className="Scheduler-events" >
              {this.findEvents('MONDAY')}
              </div>
            </div>
            <div className="Scheduler-day" >
              <div className="Scheduler-day-title">TUESDAY</div>
              <div className="Scheduler-events">
              {this.findEvents('TUESDAY')} 
              </div>
            </div>
            <div className="Scheduler-day" >
              <div className="Scheduler-day-title">WEDNESDAY</div>
              <div className="Scheduler-events" >
              {this.findEvents('WEDNESDAY')}
              </div> 
            </div>
            <div className="Scheduler-day" >
              <div className="Scheduler-day-title">THURSDAY</div>
              <div className="Scheduler-events" >
              {this.findEvents('THURSDAY')}
              </div>
            </div>
            <div className="Scheduler-day" >
              <div className="Scheduler-day-title">FRIDAY</div>
              <div className="Scheduler-events" >
              {this.findEvents('FRIDAY')}
              </div>
            </div>
            <div className="Scheduler-day" >
              <div className="Scheduler-day-title">SATURDAY</div>
              <div className="Scheduler-events">
              {this.findEvents('SATURDAY')}
              </div>
            </div>
            
          </div>
          <div className="Scheduler-details">
            <div className="Scheduler-details-header">CALENDER DETAILS</div>
            <div className="Scheduler-details-total_events">
              <div>TOTAL EVENTS: {this.events.length}</div>
            </div>
            <div className="Scheduler-details-extra">
              {!this.props.evt.id ? <div>NO DATA</div> : 
              <div className="Scheduler-extra">
                <div> ID: {this.props.evt.id}</div>
                <div> NAME: {this.props.evt.name}</div>
                <div> DAY: {this.props.evt.day}</div>
                <div> DETAILS: {this.props.evt.details}</div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    evt: state.evt
  };
};

export default connect(mapStateToProps, {setCurrentEvent})(Scheduler);


