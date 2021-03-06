import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';

//import '../../styles/InfoGraphics.css';

class InfoGraphicDisplay extends Component {
  constructor(props){
    super(props);
    this.toggle = props.toggle || false;
    this.width = props.width;
    this.height = props.height;
  }

  render() {
    return (
      <div className="IG-display"  id="IG-Display" style={
        this.props.blob ?
          this.toggle ?
            {height: this.height, width: this.width, background:'whitesmoke'} :  //blob 1 toggle 1
            {height: 'auto', width: this.width, background:'whitesmoke'} :       //blob 1 toggle 0
          !this.toggle ?
            {height: 'auto', width: '100%', overflow: 'hidden',background:'whitesmoke'} :  // blob 0 toggle 0
            {height:'0', width: this.width, background:'whitesmoke'}                       // blob 0 toggle 1
        }>
        {
          this.toggle ?
            <div className="IG-display-header">
              <img onClick={()=>this.props.setInfoGraphicBlob(null)} src={'images/_btn/arrow_up.png'} alt="CLOSE" width="30px"/>
            </div> :  null
        }
        <div className="IG-display-blob" style={{background: 'whitesmoke'}}>
          { this.props.info ? this.props.info.blob : <div/>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.InfoGraphicBlob
  };
};

export default connect(mapStateToProps, { setInfoGraphicBlob }) (InfoGraphicDisplay);
