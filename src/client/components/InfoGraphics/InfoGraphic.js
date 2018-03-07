import React from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';

////import '../../styles/InfoGraphics.css';

const InfoGraphic = (props) => {

  const getBlob = () => {
    if (props.blob) return props.blob;
    if (props.children) return props.children;
    return ( <div> NO BLOB FOUND </div> );
  };
  console.log(props);
  return (
    <div className='account-item' onClick={() => props.setInfoGraphicBlob({accountImg: props.profilePicture, blob: getBlob()})}>
      <img src={props.profilePicture || 'images/noPhoto.jpg'} alt={'Info Graphic'} />
      <h4>{props.channelName ? props.channelName.split('@')[0] : props.name}</h4>
    </div>
  );
}

export default connect(null, { setInfoGraphicBlob}) (InfoGraphic);
