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
  return (
    <div className='account-item' style={props.parent.state.accSel === props.index ? {border: '3px solid royalblue', borderRadius: 10, cursor: 'pointer'} : {borderRadius: 10, cursor: 'pointer', border: '3px solid black',}}onClick={() => props.setInfoGraphicBlob({accountData: props.profilePicture, blob: getBlob()})}>
      <img onClick={()=> props.parent.setState({accSel:props.index})} src={props.profilePicture || 'images/noPhoto.jpg'} alt={'Info Graphic'} />
      <h4 style={{textAlign: 'center'}}onClick={()=> props.parent.setState({accSel:props.index})}>{props.channelName ? props.channelName.split('@')[0] : props.name}</h4>
    </div>
  );
}

export default connect(null, { setInfoGraphicBlob}) (InfoGraphic);
