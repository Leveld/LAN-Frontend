import React, {Component} from 'react';
import {Cookies} from 'react-cookie';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
const cookie = new Cookies();

class Messages extends Component {
  constructor(){
    super();
    this.state = {conversations:[]};
  }
  componentWillMount(){
    // GET CONVERSATIONS
      // SET CONVERSATIONS TO STATE
  }
  render(){
    const key = window.localStorage.getItem('access_token') || cookie.get('access_token'); 
    if(!key) return <Redirect to="/" />;
    return (
      <div className="Messages-wrapper">
        <div> {console.log(this.props.user)} </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps,null)(Messages);