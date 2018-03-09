import React, {Component} from 'react';
//import '../../styles/Scheduler.css';
import {connect} from 'react-redux';
import Evnt from './event';


class Scheduler extends Component {
  constructor(props){
    super(props);
    this.events = props.events || /*MOCK DATA */ [];
  //   this.events = [
  //     {
  //       id: 'u90j023g0vjirgv02',
  //       day: 'MONDAY',
  //       name: 'Banana',
  //       details: 'banana vs potato fight.'
  //     }
  //   ]
  }

  findEvents(day){
    const events = this.events.filter((e) => e.day === day);
    if(events.length === 0) return <div></div>;
    return events.map((evt, i) => {
      return <Evnt actions={this.props} key={i} id={i+1} day={evt.day} name={evt.name} details={evt.details}/>;
    });
  }

  render(){
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return (
      <div className='schedule'>
        <header className="schedule-header">Schedule</header>
        <div className="schedule-view">
          <div className="schedule-week">
            {
              days.map((day) => {
                return (
                  <div key={day} className="schedule-day" >
                    <h3 className="Scheduler-day-title">{day}</h3>
                    <div className="Scheduler-events" >
                      {this.findEvents(day)}
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className="schedule-details">
            <h3 className="Scheduler-details-header">Calendar Details:</h3>
            <div className="schedule-summary">
              <div>Total Events: <span>{this.events.length}</span></div>
            </div>
            <div className="schedule-extra">
              {
                !this.props.evt.id ?
                  <span>No additional information</span>
                  :
                  <div className="schedule-extra-details">
                    <span> <strong>ID:</strong> {this.props.evt.id}</span>
                    <span> <strong>NAME:</strong> {this.props.evt.name}</span>
                    <span> <strong>DAY:</strong> {this.props.evt.day}</span>
                    <span> <strong>DETAILS:</strong> {this.props.evt.details}</span>
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
