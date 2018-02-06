import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        // redirect to log in page
        // alert user he must be logged in
      }
    }

    render() {
      return (
        <div>{this.props.authenticated && <ComposedComponent />}</div>
      );  
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};