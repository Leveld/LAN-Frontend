import React, {Component} from 'react';
//import '../../styles/Stats.css';

export default class Stats extends Component {
  render(){
    return (
      <div className="Stats" > 
        <div className="Stats-header">STATS </div>
        <div className="Stats-wrapper">
          <div className= "Stats-stat"/>
          <div className= "Stats-stat"/>
          <div className= "Stats-stat"/>
          <div className= "Stats-stat"/>
        </div>
      </div>
    );
  }
}