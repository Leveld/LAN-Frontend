import React, {Component} from 'react';
import OverviewPaneList from '../OverviewPane/OverviewPaneList';
import Timeline from '../Timeline/timeline';
import '../../styles/CP-Home.css';

export default class CP_Home extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return ( 
      <div className="CP-Home">
        <OverviewPaneList />
        <Timeline />
      </div>
    );  
  }
}