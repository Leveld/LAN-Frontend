import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {accTypes} from '../../../server/config.json';
import {Cookies} from 'react-cookie';
import { InfoGraphicList, InfoGraphicDisplay, InfoGraphic } from '../../components';
import AccountData from './Account_Data';
import { setInfoGraphicBlob } from '../../actions';
const cookie = new Cookies();


   // // MOCK DATA
    // #############
    const list = [
      { 
        title: 'CP-HOME', 
        bg: 'black', 
        txt:'green', 
        image: 'http://www.seriouseats.com/recipes/images/2016/10/20161004-baked-potato-vicky-wasik-10-1500x1125.jpg'
      }
    ];
    // #############



class CPHome extends Component {
  constructor(props){
    super(props);
    this.data = props.user.accounts ||  list
  }

  render(){
    if(!accTypes.includes(this.props.user.type) || !this.props.authenticated || !cookie.get('access_token')) return <div />;
    
    if(!accTypes.includes(this.props.user.type)) return <div className="no_user">NO ACCOUNT SET</div>;

    return ( 
      <div style={{width: '100%', height: '100%'}}>
        <InfoGraphicList title="Accounts" color="red" >
          
          {
            this.data.map((item, i) => {
              return (
                <InfoGraphic key={i} {...item} >
                  <AccountData {...item}/>
                </InfoGraphic>
              );
            })
          }
          
        </InfoGraphicList>
        <InfoGraphicDisplay toggle={0}/>
      </div>

    );  
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth,
    user: state.user,
  };
};

export default connect(mapStateToProps, {setInfoGraphicBlob})(CPHome);