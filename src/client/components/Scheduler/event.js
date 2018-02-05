import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setCurrentEvent} from '../../actions';

class Evnt extends Component {
  constructor(props){
    super(props);
    this.selected = props.selected;
    this.id = props.id;
    this.name = props.name;
    this.details = props.details;
    this.day = props.day;
    this.state = {selected: props.selected};
    
  }
  render(){
   
    return (
      <div className="Scheduler-event" onClick={()=>{this.setState({selected: true}); this.props.setCurrentEvent({id: this.id, name: this.name, details:this.details, day: this.day })}}>
        <div className="Scheduler-event-id">{this.id}</div><div className="Scheduler-event-name">{this.name}</div>
      </div>
    )
  }
  
}

const mapStateToProps = (state) => {
  return {
    selEvnt: state.evt
  }
}

export default connect(mapStateToProps, {setCurrentEvent})(Evnt);