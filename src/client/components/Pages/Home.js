import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/Home.css';
import { CPHome} from '../index';
class Home extends Component {
  constructor(){
    super();
    this.user = null;
  }
  render(){
    let type;
    if(this.props.user.type) type = this.props.user.type.toLowerCase();

    return (
      <div className="Home-wrapper">
      {
      !this.props.authenticated ?
      <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <img className="Home-bg" alt="Logo" src={'images/logo/logo.png'}/>
        <div className="Home-welcome"><img src={'images/logo/logo.png'} width="20%" height="100%"/></div>
        <div className="Home-Accounts">
          <div className="Home-Accounts-info">
            <div className="Home-Accounts-info-title">CONTENT PROVIDER</div>
          </div>
          <div className="Home-Accounts-info">
            <div className="Home-Accounts-info-title">ADVERTISER</div>
          </div>
        </div>
      </div> :
      type === "contentproducer" ?
      <CPHome/> :
      type === "business"?
      <div> BUSINESS HOME </div>:
      <div />
      
      }
      </div>
    );
  }
}

const mapStatToProps = (state) => {
  return {
    authenticated: state.auth,
    user: state.user
  };
};

export default connect(mapStatToProps, null)(Home);