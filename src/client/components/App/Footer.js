import React, {Component} from 'react';
import {connect} from 'react-redux';
import {version} from '../../../server/config.json';

class Footer extends Component {
  
  render(){
    let inDev = false;
    process.env.NODE_ENV === "production" || process.env.PRODUCTION ? inDev = false : inDev = true; 
    return (
      <div className="App-footer-wrapper">
        {
          inDev ? 
            <div style={{display: 'flex', flexDirection: 'row', height: '100%', flex: 1, justifyContent: 'flex-end'}}>
              <div className="App-footer-dev-indicator">
                IN-DEV
              </div>        
              <div className="App-footer-wrapper-auth">
                <div style={{color: 'white', marginRight: 5, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> {version} </div>
                  {
                    this.props.authenticated ? 
                      <div style={{background: 'green'}} className="App-footer-wrapper-auth-display">AUTHENTICATED</div> : 
                      <div style={{background: 'red'}} className="App-footer-wrapper-auth-display"> NOT AUTHENTICATED</div>
                  }
              </div>
            </div>
            
          : null
        }
        <div className="App-footer-lambda" ><div className="App-footer-lambda-wrapper" >POWERED BY <div style={{color: 'black', display: 'block'}}>LAMBDASCHOOL</div></div></div>
      
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