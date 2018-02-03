import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';

import '../../styles/InfoGraphics.css';

class InfoGraphicDisplay extends Component {
  constructor(props){
    super(props);
    this.toggle = props.toggle | false;
    this.width = props.width;
    this.height = props.height;
  }
  render(){
    return (
      <div className="IG-display" id="IG-Display" style={
        this.props.blob ? 
          this.toggle ? 
            {height: this.height, width: this.width} :  
            {height: 'auto', width: this.width} : 
          {height:'0', width: this.width}
        }>
        {this.toggle ? <div className="IG-display-header"> <img onClick={()=>this.props.setInfoGraphicBlob(null)} src={'images/_btn/arrow.png'} width="30px"/> </div> : null}
        <div className="IG-display-blob" >
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
