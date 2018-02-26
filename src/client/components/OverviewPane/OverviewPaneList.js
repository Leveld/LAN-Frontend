import React, {Component} from 'react';
import OverviewPane from './OverviewPane';

export default class OverviewPaneList extends Component {
  render(){
    const arr = [1,2,3,4,4,4,4,4,4,4,4,4];
    return (
      <div className="OP-list">
      {
        arr.map((el, i) => <OverviewPane key={i} index={i}/>)
      }
      </div>
    );
  }
}