import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';


import '../../styles/InfoGraphics.css';

class InfoGraphicList extends Component {
  constructor(props){
    super(props);
    this.color = props.color;
    this.title = props.title || "TITLE";
  }

  componentWillUnmount(){
    this.props.setInfoGraphicBlob(null);
  }

  render(){
    return (
      <div className="IG-list">
        <div className="IG-list-header">{this.title}</div>
        <div style={{background: this.color}} className="IG-list-wrap">
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default connect(null, { setInfoGraphicBlob }) (InfoGraphicList);
