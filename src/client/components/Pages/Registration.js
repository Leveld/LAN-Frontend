import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
//import '../../styles/Register.css';
import { setTimeout } from 'timers';
import jwt from 'jsonwebtoken';
const {clientSecret} = require('../../../server/secret.json');
const {apiServerIP, frontServerIP} = require('capstone-utils');
const {Cookies} = require('react-cookie');
const {connect} = require('react-redux');
const cookie = new Cookies();
const fr = new FileReader();



class Registration extends Component {
  constructor(props){
    super();
    this.state = {selected: 0, name: props.user.name || "", businessName:"", age: null, gender: null,taxID:null, filePreview:null, file: null};
  }

  setImg = (e) => {
    this.setState({file:e.target.files[0]});
    fr.readAsDataURL(e.target.files[0]);
    fr.onload = () => {
      const type = fr.result.split(';')[0].split(':')[1].split('/')[0];
      if(type !== 'image') return alert('Incorrect Img Format');
      this.setState({filePreview: fr, file: this.state.file});
    }  
  }



  submit = (evnt, type) => {
    evnt.preventDefault();
    const eborder = '1.5px solid red';
    const gborder = '1.5px solid green';
    const dob = new Date(evnt.target.age.value);
    const age =  Math.floor((Date.now() - dob)/((1000*60*60*24*365)));
    const ageError = document.getElementById(`ageError-${type}`);
    !this.state.name ? this.setState({name: this.props.user.name}) : null;
    (!this.state.name && !this.props.user.name) ? evnt.target.name.style.border = eborder : evnt.target.name.style.border = gborder;
    (!this.state.businessName && this.state.selected) ? evnt.target.businessName.style.border = eborder : evnt.target.businessName.style.border = gborder;
    if(type !== 'business'){
      !age || !dob ? evnt.target.age.style.border = eborder : age >= 18 ? evnt.target.age.style.border = gborder : evnt.target.age.style.border = eborder;
      (age < 18)? ageError.style.opacity = 1 : ageError.style.opacity = 0;
      !this.state.gender ? evnt.target.gender.style.border = eborder : evnt.target.gender.style.border = gborder;
    }else{
      !this.state.taxID ? evnt.target.taxID.style.border = eborder : evnt.target.taxID.style.border = eborder;
    }
        
    if(!this.state.name || (!this.state.businessName && this.state.selected) ||( !age || age < 18 || !dob || !this.state.gender) && type !== 'business' || (!this.state.taxID && !this.state.file && type === 'business')) {
      document.getElementById(`form`).style.animation = 'shake 0.5s';
      setTimeout(() => document.getElementById(`form`).style.animation = "none", 500 );
      return ;
    }
    const token = window.localStorage.getItem('access_token') || cookie.get('access_token');
    axios.put(`${apiServerIP}user`, {
      type,
      fields: {
        name: this.state.name,
        businessName: this.state.businessName,
        age,
        taxID: this.state.taxID,
        gender: this.state.gender,
      }
    }, {headers:{Authorization:`Bearer ${token}`}})
    .then((res) => {
       alert("Registration Complete");
       const file = new FormData();
       file.append('image',this.state.file);
       axios.post(`${frontServerIP}upload`, file, {headers:{Authorization: 'Bearer ' + token}})
       .then(() => window.location.replace('/'));
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
    
  }
  render(){
    if(this.props.user.type !== "User") return <Redirect to={'/'} />;

    return (
      <div className="Register" >
        <div id="Register-wrapper" className="Register-wrapper">
          <div id="form">
          <div className="Register-types">
            <div onClick={()=> this.setState({selected: 0})} style={this.state.selected ? {border: '1px solid black'} : {borderBottom: '1px solid black', borderLeft: '1px solid green',borderTop: '1px solid green',borderRight: '1px solid green'}} className="Register-type"> CONTENT PROVIDER</div>
            <div onClick={()=> this.setState({selected: 1})} style={!this.state.selected ? {border: '1px solid black'} : {borderBottom: '1px solid black', borderLeft: '1px solid green',borderTop: '1px solid green',borderRight: '1px solid green'}}className="Register-type"> ADVERTISER</div>
          </div>
         
          {/* CONTENT PROVIDER SIGNUP */}
          <form onSubmit={(e) => this.submit(e, "contentproducer")} style={!this.state.selected ? {display: 'flex'} : {display: 'none'}} id="form0" className="Register-form">
            <label> CONTENT PROVIDER SIGNUP</label>
            <nobr id="ageError-contentproducer" >Must Be 18 years or older to continue registration</nobr>
            
            <div >
              <input name="name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} placeholder={this.props.user.name} />
              <input name="businessName" hidden />
            </div>
            <div>
              <label>DOB</label>
              <input name="age" type="date" />
              <div>
                <label>GENDER</label>
                <select onChange={(e) => this.setState({gender: e.target.value})} name="gender">
                  <option>SELECT</option>
                  <option value="male">M</option>
                  <option value="female">F</option>
                </select>
              </div>
            </div>
            <input type="submit"/>
          </form>


          {/* ADVERTISER SIGNUP */}
          <form onSubmit={(e) => this.submit(e, "business")} style={this.state.selected ? {display: 'flex'} : {display: 'none'}} id="form1"  className="Register-form">
            <label> ADVERTISER SIGNUP</label>
            <div id="ageError-business" >Must Be 18 years or older to continue registration</div>           
            {/*<input type='file' onChange={(e) => this.upload(e)}/>*/}
            <div>
              <input name="name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} placeholder={this.props.user.name} />
              <input onChange={(e) => this.setState({businessName: e.target.value})} name="businessName" value={this.state.businessName} placeholder="Business Name" />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
              <input style={{minWidth:'100px'}} name="age" type="date" hidden/>
              <label>Business Verification:</label>
              <label style={{fontSize:'10px'}}>Input Tax ID or upload any other relevant document to verify your business</label> 
              <input name="taxID" onChange={(e) => this.setState({taxID: e.target.value})} placeholder="Tax ID" />
              {/*File Img Preview*/}
              <img src={this.state.filePreview ? this.state.filePreview.result : null} width="30%"/>
              <div style={{background: 'red', width: '100px', margin: '1%', overflow: 'hidden', position:'relative', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                <input onChange={(e) => this.setImg(e)} type="file" style={{width: '100%', opacity: 0, height: '100%', display: 'flex', position: 'absolute'}}/>
                <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>UPLOAD</div>
              </div>
            <input style={{cursor:'pointer'}} type="submit"/>
              
            </div>
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
