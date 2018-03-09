import React, {Component} from 'react';
import OverviewPane from './OverviewPane';

export default class OverviewPaneList extends Component {
  constructor(props) {
    super(props);
    this.panes = props.paneList;
  }

  render() {
    return (
      <div className="">
      {
        this.panes.map((el, i) => <OverviewPane key={i} index={i} {...el} />)
      }
      </div>
    );
  }
}
