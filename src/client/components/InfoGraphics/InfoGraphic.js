import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';
import { InfoGraphicDisplay } from './InfoGraphicDisplay';
import InfoGraphic from './InfoGraphic';

import '../../styles/InfoGraphics.css';

export default (props) => {
  const image = props.image;
  const title = props.title;
  const blob = props.blob;
  const color = props.color;
  return (
    <div onClick={()=> props.actions.setInfoGraphicBlob(blob || props.children)} style={{backgroundColor:color}} className="IG-item">
      <div className="IG-item-img"><img src={image} width="100%" height="100%"/></div>
      <br />
      <div>{title}</div>
    </div>
  );
}
