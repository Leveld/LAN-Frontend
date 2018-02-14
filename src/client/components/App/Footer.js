import React, {Component} from 'react';
import {connect} from 'react-redux';
import {version} from '../../../server/version.json';

class Footer extends Component {
  render(){
    return (
      <div className="App-footer-wrapper">
        
          <div className="App-footer-wrapper-auth">
            <div style={{color: 'white', marginRight: 5, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> {version} </div>
            {
              this.props.authenticated ? 
                <div style={{background: 'green'}} className="App-footer-wrapper-auth-display">AUTHENTICATED</div> : 
                <div style={{background: 'red'}} className="App-footer-wrapper-auth-display"> NOT AUTHENTICATED</div>
            }
            <div className="App-footer-lambda" ><div className="App-footer-lambda-wrapper" >POWERED BY <div style={{color: 'black', display: 'block'}}>LAMBDASCOOL</div></div></div>
          </div> 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth
  }
}
export default connect(mapStateToProps, null)(Footer);