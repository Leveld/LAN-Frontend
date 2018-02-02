import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';

import '../../styles/InfoGraphics.css';

class InfoGraphicDisplay extends Component {
  render(){
    return (
      <div className="IG-display" style={this.props.blob ? {height: '70%'} : {height: '0'}}>
        <div className="IG-display-header"> <img onClick={()=>this.props.setInfoGraphicBlob(null)} src={'images/arrow.png'} width="30px"/> </div>
        <div className="IG-display-blob">
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
