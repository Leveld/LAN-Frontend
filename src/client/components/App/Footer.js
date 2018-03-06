import React, {Component} from 'react';
import {connect} from 'react-redux';
import {version} from '../../../server/config.json';

class Footer extends Component {

  render() {
    let inDev = false;
    process.env.NODE_ENV === 'production' || process.env.PRODUCTION ? inDev = false : inDev = true;
    return (
      <footer className="App-footer-wrapper">
        {
          inDev ?
            <div className="App-footer-wrapper">
              <div className="App-footer-dev-indicator">
                IN DEVELOPMENT
              </div>
              <div className="App-footer-wrapper-auth">
                <div className='app-version'> {version} </div>
                  {
                    this.props.authenticated ?
                      <div className="util-bg-success App-footer-wrapper-auth-display">AUTHENTICATED</div> :
                      <div className="util-bg-success App-footer-wrapper-auth-display"> NOT AUTHENTICATED</div>
                  }
              </div>
            </div>
          : null
        }
        <div className="App-footer-lambda" >
            <div className="App-footer-lambda-wrapper" >
                POWERED BY <div>LAMBDASCHOOL</div>
            </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth
  }
}
export default connect(mapStateToProps, null)(Footer);
