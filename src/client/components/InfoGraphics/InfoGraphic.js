import React from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';

import '../../styles/InfoGraphics.css';

const InfoGraphic = (props) => {

  const getBlob = () => { 
    if (props.blob) return props.blob;
    if (props.children) return props.children;
    return ( <div> NO BLOB FOUND </div> );
  };

  return (
    <div onClick={() => props.setInfoGraphicBlob({accountImg: props.image, blob: getBlob()})} style={{backgroundColor:props.bg, color: props.txt}} className="IG-item">
      <div className="IG-item-img"><img src={props.image} alt={'Info Graphic'} width="100%" height="100%"/></div>
      <div>{props.title}</div>
    </div>
  );
}

export default connect(null, { setInfoGraphicBlob}) (InfoGraphic);
