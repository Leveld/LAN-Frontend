import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';

import '../../styles/InfoGraphics.css';

class InfoGraphicDisplay extends Component {
  constructor(props){
    super(props);
    this.toggle = props.toggle | false;
  }
  render(){
    return (
      <div className="IG-display" id="IG-Display" style={
        this.props.blob ? {height: '70%'} : this.toggle ? {height: '0'} : {height:'70%'}
        }>
        {this.toggle ? <div className="IG-display-header"> <img onClick={()=>this.props.setInfoGraphicBlob(null)} src={'images/arrow.png'} width="30px"/> </div> : null}
        <div className="IG-display-blob" style={!this.toggle ? {marginTop: '3%'} : null}>
          { this.props.blob }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blob: state.InfoGraphicBlob
  };
};

export default connect(mapStateToProps, { setInfoGraphicBlob }) (InfoGraphicDisplay);
