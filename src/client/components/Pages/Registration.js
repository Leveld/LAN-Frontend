import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import '../../styles/Register.css';
import { setTimeout } from 'timers';
const {apiServerIP, frontServerIP} = require('capstone-utils');
const TestingData = require('../../../TesingsData');
const {Cookies} = require('react-cookie');
const {connect} = require('react-redux');
const cookie = new Cookies();


class Registration extends Component {
  constructor(props){
    super();
    this.state = {selected: 0, name: props.user.name || "", businessName:"", age: null, gender: null};
  }


  submit = (evnt, type) => {
    evnt.preventDefault();
    const eborder = '1.5px solid red';
    const gborder = '1.5px solid green';
    const dob = new Date(evnt.target.age.value);
    const age =  Math.floor((Date.now() - dob)/((1000*60*60*24*365)));
    !this.state.name ? this.setState({name: this.props.user.name}) : null;
    (!this.state.name && !this.props.user.name) ? evnt.target.name.style.border = eborder : evnt.target.name.style.border = gborder;
    (!this.state.businessName && this.state.selected) ? evnt.target.businessName.style.border = eborder : evnt.target.businessName.style.border = gborder;
    !age || !dob ? evnt.target.age.style.border = eborder : evnt.target.age.style.border = gborder;
    !this.state.gender ? evnt.target.gender.style.border = eborder : evnt.target.gender.style.border = gborder;

    if(!this.state.name || (!this.state.businessName && this.state.selected) || !age || !dob || !this.state.gender) {
      document.getElementById(`form`).style.animation = 'shake 0.5s';
      setTimeout(() => document.getElementById(`form`).style.animation = "none", 500 );
      return ;
    }
    const token = window.localStorage.getItem('access_token') || cookie.get('access_token');
    axios.put(`http://api.localhost.test:3001/user`, {
      type,
      fields: {
        name: this.state.name,
        businessName: this.state.businessName,
        age,
        gender: this.state.gender
      }
    }, {headers:{Authorization:`Bearer ${token}`}})
    .then((res) => {
      alert("Registration Complete");
      window.location.replace('/');
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
    
  }
  render(){
    return (
      <div className="Register" >
        <div id="Register-wrapper" className="Register-wrapper">
          <div id="form" style={{display: 'flex', flexDirection: 'column', background: 'red', width: '80%'}}>
          <div className="Register-types">
            <div onClick={()=> this.setState({selected: 0})} style={this.state.selected ? {border: '1px solid black'} : {border: '1px solid white'}} className="Register-type"> CONTENT PROVIDER</div>
            <div onClick={()=> this.setState({selected: 1})} style={!this.state.selected ? {border: '1px solid black'} : {border: '1px solid white'}}className="Register-type"> ADVERTISER</div>
          </div>
         
          {/* CONTENT PROVIDER SIGNUP */}
          <form onSubmit={(e) => this.submit(e, "contentproducer")} style={!this.state.selected ? {display: 'flex'} : {display: 'none'}} id="form0" className="Register-form">
            <label> CONTENT PROVIDER SIGNUP</label>
            <div id="val0">FORM MUST BE COMPLETED</div>
            
            <div  style={{display: 'flex', flexDirection: 'row', flex: 1}}>
              <input name="name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} placeholder={this.props.user.name} />
              <input name="businessName" hidden />
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
              <label>DOB</label>
              <input style={{minWidth:'100px'}} name="age" type="date" />
              <div style={{whiteSpace: 'nowrap', display: 'flex', flexDirection: 'row'}}>
                <label>GENDER</label>
                <select onChange={(e) => this.setState({gender: e.target.value})} name="gender">
                  <option>SELECT</option>
                  <option value="male">M</option>
                  <option value="female">F</option>
                </select>
              </div>
            </div>
            <input style={{cursor:'pointer'}} type="submit"/>
          </form>


          {/* ADVERTISER SIGNUP */}
          <form onSubmit={(e) => this.submit(e, "business")} style={this.state.selected ? {display: 'flex'} : {display: 'none'}} id="form1"  className="Register-form">
            <label> ADVERTISER SIGNUP</label>
            <div id="val1">FORM MUST BE COMPLETED</div>            
            {/*<input type='file' onChange={(e) => this.upload(e)}/>*/}
            <div style={{display: 'flex', flexDirection: 'row', flex: 1}}>
              <input name="name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} placeholder={this.props.user.name} />
              <input onChange={(e) => this.setState({businessName: e.target.value})} name="businessName" value={this.state.businessName} placeholder="Business Name" />
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
              <label>OWNER DOB</label>
              <input style={{minWidth:'100px'}} name="age" type="date" />
              <div style={{whiteSpace: 'nowrap', display: 'flex', flexDirection: 'row'}}>
                <label>GENDER</label>
                <select onChange={(e) => this.setState({gender: e.target.value})} name="gender">
                  <option>SELECT</option>
                  <option value="male">M</option>
                  <option value="female">F</option>
                </select>
              </div>
            </div>
            <input style={{cursor:'pointer'}} type="submit"/>
          </form>
          </div>      
        </div>
        <div className="Register-img"><img src={'/images/logo/logo.png'} width="100%" /></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(Registration); 