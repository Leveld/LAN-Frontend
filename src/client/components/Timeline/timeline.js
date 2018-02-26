import React, {Component} from 'react';
import '../../styles/Timeline.css';

export default class Timeline extends Component {
  constructor(props){
    super(props);
    this.chartA = props.chartA;
    this.chartB = props.chartB;
  }

  render(){
    const tmpStyle = {width: '100%', height: '50%', background: 'rgb(35, 69, 100)', border: '1px solid black'}; 
    return (
      <div className="TL-wrapper">
        <div className="TL-section-A">
          <div style={tmpStyle}/>
          <div style={tmpStyle}/>
        </div>
        <div className="TL-section-B"> 
          <div className="TL-chart-A"><img src={this.chartA} alt="Chart A" /> </div>
          <div className="TL-chart-B"><img src={this.chartB} alt="Chart B" /></div>
        </div>
      </div>
    )
  }
}