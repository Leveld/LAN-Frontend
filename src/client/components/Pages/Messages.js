import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {apiServerIP, frontServerIP} from 'capstone-utils';
import {Cookies} from 'react-cookie';
import '../../styles/Messages.css';
import jwt from 'jsonwebtoken';
import {clientSecret} from '../../../server/secret.json';
const cookie = new Cookies();
const token = window.localStorage.getItem('access_token') || cookie.get('access_token');
let warning = null;

class Message extends Component {
  constructor(props){
    super(props);
    this.state = {id: props.from, name: null};
    this.message = props.message;
    
  }
  componentWillMount(){
    this.findUser(this.state.id);
  }

  findUser = (id) => {
    axios.get(`${apiServerIP}user?id=5a9676d9a504fb36602af75a&type=contentproducer`, {headers:{Authorization: token}})
    .then((res) => {
      const user = res.data;
      this.setState({name: user.name});
    })
    .catch((err) => alert(err));
  }
  decode = (key) => {
    try{
      return jwt.verify(key, clientSecret);
    }catch(err) {
      return warning = "[WARNING: UNPROTECTED MESSAGE!]";
    }
  }


  render(){
    
    if(!this.state.name) return <div> LOADING... </div>;
    if(this.decode(this.message) === "[UNPROTECTED]") return warning = "[WARNING: UNPROTECTED MESSAGE!]";
    return (
      <div  style={{whiteSpace: 'pre-line'}}>{this.state.name }: {this.decode(this.message)}</div>
    );
  }
}

class Messages extends Component {
  constructor(){
    super();
    this.state = {convos: [], convoID: null, messages: []}
  }
  componentDidMount = () =>{
    if(!token) return history.back();
    axios.get(`${frontServerIP}convos`, {headers:{Authorization: token}})
    .then((res) => {
      this.setState({convos: res.data})
    })
    .catch((err) => this.setState({convos: ['NO MESSAGES']}));
  }
  componentWillReceiveProps(props){
    //console.log(this.state.convos);
  }
  encode = (msg) => jwt.sign(msg, clientSecret);



  addMessage = (e) => {
    e.preventDefault();
    const message = this.encode(e.target.msg.value);
    const msg = {
      convoID: this.state.convoID,
      from: this.props.user._id,
      message,
      timestamp: Date.now()
    }
    axios.post(`${frontServerIP}message`, msg, {headers:{Authorization: token}})
    .then((res) => {
      res.data.forEach((convo) => {
        
        if(convo.id === this.state.convoID) this.setState({messages: convo.messages});
      });
      this.setState({convos: res.data});
    })
    .catch((err) => {
      alert(err);
    });
  }

  

  render(){
    return (
      <div className="Messages-wrapper">
        <div className="Messages-ls">
          <div className="Messages-ls-content">
            <div className="Messages-header">{this.props.user._id}</div>
            {this.state.convos.map((convo, i) => {
              if(convo.messages.length === 1 && convo.messages[0].from === this.props.user._id) return;
              const userids = [];
              for(let i = 0; i < convo.messages.length; i++){
                if(convo.messages[i].from !== this.props.user._id) userids.push(convo.messages[i].from);
              }
              return <div key={i} onClick={() => this.setState({convoID:convo.id, messages:convo.messages})}>{userids.join("-")}</div>
            })}
          </div>
        </div>
        <div className="Messages-rs">
          <div className="Messages-header">MESSAGES</div>
          {!process.env.PRODUCTION && this.state.convoID ? <div className="Messages-header">convo ID: {this.state.convoID}</div> : null}
          <div>{warning}</div>
          {this.state.messages.map((item, i) => {
            
            return <Message key={i} {...item} />;
          })}
          <form onSubmit= {(e) => this.addMessage(e)} className="Messages-rs-form">
            <textarea name="msg" className="Messages-rs-form-input" type="text"/>
            <input type="submit" value="SEND" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps, null)(Messages);