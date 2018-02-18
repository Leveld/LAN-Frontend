import React, {Component} from 'react';
import '../../styles/Scheduler.css';
import {connect} from 'react-redux';
import Evnt from './event';


class Scheduler extends Component {
  constructor(props){
    super(props);
    const event1 = {day:'SUNDAY', name:'sunday', details: "These are the details1" };
    const event2 = {day:'FRIDAY', name:'friday', details: "These are the details2" };
    const event3 = {day:'TUESDAY', name:'tuesday', details: "THIS IS A VERY LONG MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, MESSAGE, " };
    this.events = props.events || /*MOCK DATA */ [event1, event2, event2, event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3,event3];
  }

  findEvents(day){
    const events = this.events.filter((e) => e.day === day);
    if(events.length === 0) return <div style={{marginTop:'5%'}}>NO EVENTS</div>;
    return events.map((evt, i) => {
      return <Evnt actions={this.props} key={i} id={i+1} day={evt.day} name={evt.name} details={evt.details}/>;
    });
  }

  render(){
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return (
      <div style={{width: '100%', height: '300px', display: 'flex', flexDirection: 'column'}}>
        <div className="Scheduler-header">SCHEDULER</div>
        <div className="Scheduler-wrapper">
          <div className="Scheduler-week">
            {
              days.map((day) => {
                return (
                  <div key={day} className="Scheduler-day" >
                    <div className="Scheduler-day-title">{day}</div>
                    <div className="Scheduler-events" >
                      {this.findEvents(day)}
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className="Scheduler-details">
            <div className="Scheduler-details-header">CALENDER DETAILS</div>
            <div className="Scheduler-details-total_events">
              <div>TOTAL EVENTS: <span style={{color: 'red'}}>{this.events.length}</span></div>
            </div>
            <div className="Scheduler-details-extra">
              {
                !this.props.evt.id ? 
                  <div>NO DATA</div> 
                  : 
                  <div className="Scheduler-extra">
                    <div> <span>ID:</span> {this.props.evt.id}</div>
                    <div> <span>NAME:</span> {this.props.evt.name}</div>
                    <div> <span>DAY:</span> {this.props.evt.day}</div>
                    <div> <span>DETAILS:</span> {this.props.evt.details}</div>
                  </div>
              }
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

export default connect(mapStateToProps)(Scheduler);


