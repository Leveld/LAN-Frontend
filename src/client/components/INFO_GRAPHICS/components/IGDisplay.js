import React, {Component} from 'react';
import '../styles/IGStyles.css';
import {connect} from 'react-redux';
import {setIGBlog} from '../redux/actions';
const closeBtn = require('../assets/arrow.png');

class IGDisplay extends Component {
  render(){
    return (
      //DISPLAY IG INFO
      
      <div className="IG-display" style={this.props.blob ? {height: '70%'} : {height: '0'}}>
        <div className="IG-display-header"> <img onClick={()=>this.props.setIGBlog(null)} src={closeBtn} width="30px"/> </div>
        {this.props.blob}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    blob: state.IGBlob
  };
};

export default connect(mapStateToProps, {setIGBlog}) (IGDisplay);