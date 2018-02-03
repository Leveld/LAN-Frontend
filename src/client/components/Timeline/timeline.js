import React, {Component} from 'react';
import '../../styles/Timeline.css';

export default class Timeline extends Component {

  render(){
    const tmpStyle = {width: '100%', height: '50%', background: 'blue', border: '1px solid black'}; 
    return (
      <div className="TL-wrapper">
        <div className="TL-section-A">
          <div style={tmpStyle}/>
          <div style={tmpStyle}/>
        </div>
        <div className="TL-section-B">
          
          <div className="TL-chart-A"/>
          <div className="TL-chart-B"/>
        </div>
      </div>
    )
  }
}