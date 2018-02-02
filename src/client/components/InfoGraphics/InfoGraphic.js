import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';
import { InfoGraphicDisplay } from './InfoGraphicDisplay';

import '../../styles/InfoGraphics.css';

const InfoGraphic = (props) => {
  const getBlob = () => {
    if (props.blob !== undefined) {
      return blob;
    }
    if (props.children !== undefined)
      return props.children;
    return ( <div> NO BLOB FOUND </div> );
  };

  const image = props.image;
  const title = props.title;
  const blob = props.blob;
  const color = props.color;
  return (
    <div onClick={() => props.setInfoGraphicBlob(getBlob())} style={{backgroundColor:color}} className="IG-item">
      <div className="IG-item-img"><img src={image} width="100%" height="100%"/></div>
      <br />
      <div>{title}</div>
    </div>
  );
}

export default connect(null, { setInfoGraphicBlob }) (InfoGraphic);
