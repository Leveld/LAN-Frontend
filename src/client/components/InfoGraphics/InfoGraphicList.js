import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';
import {apiServerIP} from 'capstone-utils';
import axios from 'axios';
import {Cookies} from 'react-cookie';
import {accTypes} from '../../../server/config.json';
import AccountData, { accountData } from '../Pages/Account_Data';
const cookie = new Cookies();


//import '../../styles/InfoGraphics.css';

class InfoGraphicList extends Component {
  constructor(props){
    super(props);
    this.color = props.color;
    this.title = props.title || "TITLE";
  }
  componentDidMount(){
    if(this.props.accounts === 0 && this.props.user.type !== accTypes[0] ) return;
      if(this.props.children[0]){
        return this.props.setInfoGraphicBlob({accountImg:this.props.children[0].props.profilePicture || 'images/noPhoto.jpg', blob:this.props.children[0].props.children });
      }
      this.props.setInfoGraphicBlob({accountData: this.props.children[1][0].props.profilePicture, blob: <AccountData />});
  }

  componentWillUnmount(){
    this.props.setInfoGraphicBlob(null);
  }

  addCO = () => {
    const token = window.localStorage.getItem('access_token') || cookie.get('access_token');
    axios.get(`${apiServerIP}coURL`, {params: {type: 'google'},headers: {Authorization: `Bearer ${token}`}})
    .then((res) => {
      window.location.replace(res.data.url);
    });
  }

  render(){
    let blobImage;
    blobImage = this.props.user.profilePicture || 'images/noPhoto.jpg' ;
    if(this.props.info) blobImage = this.props.info.accountImg || 'images/noPhoto.jpg';

    return (
      <div className='inline-list account-list'>
        <div className="IG-list">
          <div className="IG-list-header">{this.title}</div>
          <div>
            <div >
              <img src={blobImage} width='70px' height="70px"/>
            </div>
            <div className="IG-list-wrap">
                {this.props.children}
                <div onClick={()=>this.props.user.type === accTypes[1] ? this.addCO() : alert('add manager')} className="IG-add" > +</div>
            </div>
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
