import axios from 'axios';
import {frontServerIP} from 'capstone-utils';
import React, {Component} from 'react';

const sendFile = (form) => {
  form.preventDefault();
  console.log(form.target.file);
  const data = new FormData();
  data.append('image', form.target.file.files[0]);
  axios.post(`${frontServerIP}upload`, data, {headers:{Authorization: window.localStorage.getItem('access_token')}});
}

export default class Test_Form extends Component{
  render () {
      return (
      <form onSubmit={(e)=> sendFile(e)}>
        <input type="file" name="file" />
        <input type="submit" />
        HI
      </form>
    );
  }
}

