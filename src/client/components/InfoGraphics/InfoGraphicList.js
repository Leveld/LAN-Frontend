import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';
import { InfoGraphicDisplay } from './InfoGraphicDisplay';
import InfoGraphic from './InfoGraphic';

import '../../styles/InfoGraphics.css';

class InfoGraphicList extends Component {
  constructor(props){
    super(props);
    this.list = props.list; //list of objets {title, image, blob}
    this.color = props.color;
    this.title = props.title;
  }

  componentWillUnmount(){
    this.props.setInfoGraphicBlob(null);
  }
  render(){
    const header = <div className="IG-list-header">{this.title || "TITLE"}</div>;

    return (
      <div className="IG-list">
        {header}
        <div style={{background: this.color}} className="IG-list-wrap">
          {this.props.children}
        </div>
      </div>
    );

    // NO ACCOUNTS FOUND
    // return (
    //   <div className="IG-list">
    //     {header}
    //     <div style={{fontSize:'0.7rem', marginTop:5, marginBottom:5}}>NO ACCOUNTS FOUND</div>
    //   </div>
    // );
  }
}


export default connect(null, { setInfoGraphicBlob }) (InfoGraphicList);
