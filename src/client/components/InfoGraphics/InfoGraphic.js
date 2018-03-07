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
  console.log(props);
  return (
    <div onClick={() => props.setInfoGraphicBlob({accountImg: props.profilePicture, blob: getBlob()})} className="IG-item">
      <div className="IG-item-img"><img src={props.profilePicture || 'images/noPhoto.jpg'} alt={'Info Graphic'} width="100%" height="100%"/></div>
      <div className="IG-item-title">{props.channelName ? props.channelName.split('@')[0] : props.name}</div>
    </div>
  );
}

export default connect(null, { setInfoGraphicBlob}) (InfoGraphic);
