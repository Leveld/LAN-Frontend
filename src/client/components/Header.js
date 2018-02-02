import React, { Component } from 'react';

const isAuthenticated = false; // get this from the redux store in the future

export class Header extends Component {
  getLinks(){
    if (isAuthenticated){
      return (
        <li> Link to Sign Out </li>
      );
    } else {
      return [
        <li key={1}> Link to Sign In </li>,
        <li key={2}> Link to Sign Up </li>
      ];
    }
  }

  render(){
    return (
      <div>
        <img src='http://one-call.ca/wp-content/uploads/2013/08/logo.png' style={{width: 100, height: 100}} />
        <h2>LevelD</h2>
        <ul>
          {this.getLinks()}
        </ul>
      </div>
    );
  }
}