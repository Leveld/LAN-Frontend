import React, {Component} from 'react';
//import '../../styles/Scheduler.css';
import {connect} from 'react-redux';
import Evnt from './event';


class Scheduler extends Component {
  constructor(props){
    super(props);
    this.events = props.events || /*MOCK DATA */ [];
  }

  findEvents(day){
    const events = this.events.filter((e) => e.day === day);
    if(events.length === 0) return <div>NO EVENTS</div>;
    return events.map((evt, i) => {
      return <Evnt actions={this.props} key={i} id={i+1} day={evt.day} name={evt.name} details={evt.details}/>;
    });
  }

  render(){
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return (
      <div className='schedule'>
        <header className="schedule-header">SCHEDULER</header>
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
          <div className="Scheduler-details">
            <div className="Scheduler-details-header">CALENDER DETAILS</div>
            <div className="Scheduler-details-total_events">
              <div>TOTAL EVENTS: <span>{this.events.length}</span></div>
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
