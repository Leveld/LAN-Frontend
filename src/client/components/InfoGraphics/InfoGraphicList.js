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
    this.defaultBlob = <div style={{ color: 'white' }}>NO BLOB FOUND</div>;
    this.color = props.color;
  }

  render(){
    const header = <div className="IG-list-header">ACCOUNTS</div>;

    if(this.list && this.list.length > 0)
      return (
        <div className="IG-list">
          {header}
          <div style={{background: this.color}} className="IG-list-wrap">
            {this.list.map((item, i) => {
              return (
                <InfoGraphic key={i} color={item.color} actions={this.props} title={item.title} image={item.image} blob={item.blob}>
                  {this.defaultBlob}
                </InfoGraphic>
              );
            })}
          </div>
        </div>
      );

    // NO ACCOUNTS FOUND
    return (
      <div className="IG-list">
        {header}
        <div style={{fontSize:'0.7rem', marginTop:5, marginBottom:5}}>NO ACCOUNTS FOUND</div>
      </div>
    );
  }
}


export default connect(null, { setInfoGraphicBlob }) (InfoGraphicList);
