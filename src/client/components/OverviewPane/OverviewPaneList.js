import React, {Component} from 'react';
import OverviewPane from './OverviewPane';

export default class OverviewPaneList extends Component {
  render(){
    return (
      <div className="OP-list">
        <OverviewPane />
        <OverviewPane />
        <OverviewPane />
      </div>
    );
  }
}