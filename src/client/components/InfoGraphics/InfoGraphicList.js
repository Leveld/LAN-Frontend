import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';


import '../../styles/InfoGraphics.css';

class InfoGraphicList extends Component {
  constructor(props){
    super(props);
    this.color = props.color;
    this.title = props.title || "TITLE";
  }
  componentDidMount(){
    if(this.props.children.length > 0)
      this.props.setInfoGraphicBlob({accountImg:this.props.children[0].props.image || 'images/noPhoto.jpg', blob:this.props.children[0].props.children});
  }

  componentWillUnmount(){
    this.props.setInfoGraphicBlob(null);
  }

  render(){
    let blobImage;
    blobImage = this.props.user.profileImage || 'images/noPhoto.jpg' ;
    if(this.props.info) blobImage = this.props.info.accountImg || 'images/noPhoto.jpg';

    return (
      <div className="IG-list">
        <div className="IG-list-header">{this.title}</div>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', height:100}}>
          <div style={{background: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 100, height: '100%'}} >
            <img style={{borderRadius: 5, border: '1px solid green'}} src={blobImage} width='70px' height="70px"/>
          </div>
          <div style={{background: this.color}} className="IG-list-wrap">
              {this.props.children}
              <div style={{background: 'green', height:20, width: 20, borderRadius: 5, cursor: 'pointer', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center'}}  > +</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.InfoGraphicBlob,
    user: state.user
  }
}


export default connect(mapStateToProps, { setInfoGraphicBlob }) (InfoGraphicList);
