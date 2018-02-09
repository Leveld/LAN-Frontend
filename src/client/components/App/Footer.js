import React, {Component} from 'react';
import {connect} from 'react-redux';

class Footer extends Component {
  render(){
    return (
      <div className="App-footer-wrapper">
        
          <div className="App-footer-wrapper-auth">
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