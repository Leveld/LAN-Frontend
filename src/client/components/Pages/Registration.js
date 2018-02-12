import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import '../../styles/Register.css';
const {apiServerIP, frontServerIP} = require('../../../server/util');
const TestingData = require('../../../TesingsData');
const {Cookies} = require('react-cookie');
const {connect} = require('react-redux');
const cookie = new Cookies();



class Registration extends Component {
  constructor(){
    super();
    this.state = {selected: 0, name: null, businessName: null, age: null, gender: null};
  }


  submit = (evnt, type) => {
    evnt.preventDefault();
    const dob = new Date(this.state.age);
    const age =  Math.floor((Date.now() - dob)/((1000*60*60*24*365)));
  
     axios.put(`${apiServerIP}user`, {
      type,
      fields: {
        name: this.state.name,
        businessName: this.state.businessName,
        age,
        gender: this.state.gender
      }
    }, {headers:{Authorization:`Bearer ${cookie.get('access_token')}`}})
    .then((res) => {
      this.props.auth.login();
      
    })
    .catch((err) => {
      this.props.auth.login();
    });
    
  }
  render(){
    return (
      <div className="Register" >
        <div className="Register-wrapper">
          <div className="Register-types">
            <div onClick={()=> this.setState({selected: 0})} style={this.state.selected ? {border: '1px solid black'} : {border: '1px solid white'}} className="Register-type"> CONTENT PROVIDER</div>
            <div onClick={()=> this.setState({selected: 1})} style={!this.state.selected ? {border: '1px solid black'} : {border: '1px solid white'}}className="Register-type"> ADVERTISER</div>
          </div>
         
          {/* CONTENT PROVIDER SIGNUP */}
          <form onSubmit={(e) => this.submit(e, "contentproducer")} style={!this.state.selected ? {display: 'flex'} : {display: 'none'}} className="Register-form">
            <label> CONTENT PROVIDER SIGNUP</label>
            <div style={{display: 'flex', flexDirection: 'row', flex: 1}}>
              <input name="name" value={this.state.value} onChange={(e) => this.setState({name: e.target.value})} placeholder={this.props.user.name} />
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
              <label>AGE</label>
              <input onChange={(e) => this.setState({age: target.value})} style={{minWidth:'100px'}} name="age" type="date" />
              <div style={{whiteSpace: 'nowrap', display: 'flex', flexDirection: 'row'}}>
                <label>GENDER</label>
                <select onClick={(e) => this.setState({gender: e.target.value})} name="gender">
                  <option>SELECT</option>
                  <option value="male">M</option>
                  <option value="female">F</option>
                </select>
              </div>
            </div>
            <input style={{cursor:'pointer'}} type="submit"/>
          </form>


          {/* ADVERTISER SIGNUP */}
          <form onSubmit={(e) => this.submit(e, "business")} style={this.state.selected ? {display: 'flex'} : {display: 'none'}} className="Register-form">
            <label> ADVERTISER SIGNUP</label>
            <div style={{display: 'flex', flexDirection: 'row', flex: 1}}>
              <input name="name" onChange={(e) => this.setState({name: e.target.value})} placeholder={this.props.user.name} />
            </div>
            <input type='file' onChange={(e) => this.upload(e)}/>
            <div style={{display: 'flex', flexDirection: 'row', flex: 1}}>
              <input onChange={(e) => this.setState({businessName: e.target.value})} name="businessName" value={this.state.businessName} placeholder="Business Name" />
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
              <label>AGE</label>
              <input onChange={(e) => this.setState({age: e.target.value})} style={{minWidth:'100px'}} name="age" type="date" />
              <div style={{whiteSpace: 'nowrap', display: 'flex', flexDirection: 'row'}}>
                <label>GENDER</label>
                <select onClick={(e) => this.setState({gender: e.target.value})} name="gender" value>
                  <option>SELECT</option>
                  <option value="male">M</option>
                  <option value="female">F</option>
                </select>
              </div>
            </div>
            <input style={{cursor:'pointer'}} type="submit"/>
          </form>
                    
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