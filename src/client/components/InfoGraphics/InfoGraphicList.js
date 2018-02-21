import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';
import {apiServerIP} from 'capstone-utils';
import axios from 'axios';
import {Cookies} from 'react-cookie';
const cookie = new Cookies();


import '../../styles/InfoGraphics.css';

class InfoGraphicList extends Component {
  constructor(props){
    super(props);
    this.color = props.color;
    this.title = props.title || "TITLE";
    this.state = {addItem: false};
  }
  componentDidMount(){
    if(this.props.children.length > 0)
      this.props.setInfoGraphicBlob({accountImg:this.props.children[0].props.profilePicture || 'images/noPhoto.jpg', blob:this.props.children[0].props.children});
  }

  componentWillUnmount(){
    this.props.setInfoGraphicBlob(null);
  }

  addCO = () => {
    axios.get(`${apiServerIP}coURL`, {params: {type: 'google'},headers: {Authorization: `Bearer ${cookie.get('access_token')}`}})
    .then((res) => {
      console.log(res.data);
      window.location.replace(res.data.url);
    });
  }

  render(){
    let blobImage;
    blobImage = this.props.user.profileImage || 'images/noPhoto.jpg' ;
    if(this.props.info) blobImage = this.props.info.accountImg || 'images/noPhoto.jpg';

    return (
      <div>
        <div className="IG-list">
          <div className="IG-list-header">{this.title}</div>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', height:100}}>
            <div style={{background: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 100, height: '100%'}} >
              <img style={{borderRadius: 5, border: '1px solid green'}} src={blobImage} width='70px' height="70px"/>
            </div>
            <div style={{background: this.color}} className="IG-list-wrap">
                {this.props.children}
                <div onClick={()=>this.addCO()} className="IG-add" > +</div>
            </div>
          </div>
        </div>
        <div  style={this.state.addItem ? {height:400} : {height: 0}} className="IG-add-item">
          <form className="IG-add-form">
            ADD ITEM FORM
          </form>
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
