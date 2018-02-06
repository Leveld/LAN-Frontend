import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';

export class Notification extends Component {
  notify = () => {
    if(this.props.notification.type === 'error') {
      toast.error(this.props.notification.message);
    }
    if(this.props.notification.type === 'success') {
      toast.success(this.props.notification.message);
    }
    if(this.props.notification.type === 'info') {
      toast.info(this.props.notification.message);
    }
    return;
  }
  render(){
    return (
      <div>
        {this.props.notification ? this.notify() : null}
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);