import React, {Component} from 'react';
import axios from 'axios';
import '../../styles/Register.css';
const {dbServerIP} = require('../../../server/util');
const TestingData = require('../../../TesingsData');

const serverIP = dbServerIP;

export default class Registration extends Component {
  constructor(){
    super();
    this.state = {selected: 0, email: null};
  }
  componentDidMount(){
    window.location.hash = ""; //Clear Hash

    // GET EMAIL && SET BY AUTH0 TOKEN

  }

  componentWillMount(){
    window.localStorage.setItem('token', window.location.hash.substring(1));
    !window.localStorage.getItem('token') ? window.location.replace(`/error?m=NO TOKEN`) : null; // REDIRECT USER TO AUTO0    
  }
  
  submit = (evnt, type) => {
    evnt.preventDefault();

    const dob = new Date(evnt.target.age.value);
    const age =  Math.floor((Date.now() - dob)/((1000*60*60*24*365)));
    const data = {
      email: window.localStorage.getItem('email'),
      type,
      fields:{
        name: `${evnt.target.fName.value } ${evnt.target.lName.value}` ,
        businessName: type.toLowerCase() === 'business' ? evnt.target.businessName.value : null,
        age,
        gender: evnt.target.gender.value,
        auth0ID: window.localStorage.getItem('token'),
        createdAt: Date.now()
      }
    }
    console.log(data);
    axios.put(`${serverIP}user`,data, {headers:{Authorization: "Bearer" +  window.localStorage.getItem('token')}})
    .then((res) => {
      if(res.data) {
        alert('REGISTRATION COMPLETE');
        window.location.replace('/');
      }
    })
    .catch((err) => window.location.replace(`/error?m=${err.response.data.message}`))
  }
  render(){
    if(!window.localStorage.getItem('token')) return <div/>;
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
              <input name="fName" placeholder="First Name" />
              <input name="lName" placeholder="Last Name"/>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
              <label>AGE</label>
              <input style={{minWidth:'100px'}} name="age" type="date" />
              <div style={{whiteSpace: 'nowrap', display: 'flex', flexDirection: 'row'}}>
                <label>GENDER</label>
                <select name="gender">
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
              <input name="fName" placeholder="First Name" />
              <input name="lName" placeholder="Last Name"/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', flex: 1}}>
              <input name="businessName" placeholder="Business Name" />
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
              <label>AGE</label>
              <input style={{minWidth:'100px'}} name="age" type="date" />
              <div style={{whiteSpace: 'nowrap', display: 'flex', flexDirection: 'row'}}>
                <label>GENDER</label>
                <select name="gender">
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