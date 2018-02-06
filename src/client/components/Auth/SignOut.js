import React, { Component } from 'react';
import { signOut } from '../../actions';
import { connect } from 'react-redux';

class SignOut extends Component {
  componentWillMount() {
    this.props.signOut();
  }

  render() {
    return null;
    // in the future use react router to redirect to home page, probably
    // <Redirect to="/" />
  }
}

export default connect(null, { signOut })(SignOut);