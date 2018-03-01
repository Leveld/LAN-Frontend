import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {apiServerIP, frontServerIP} from 'capstone-utils';
import {Cookies} from 'react-cookie';
import '../../styles/Messages.css';
import jwt from 'jsonwebtoken';
import {clientSecret} from '../../../server/secret.json';
import {accTypes} from '../../../server/config.json'; 
const cookie = new Cookies();
const token = window.localStorage.getItem('access_token') || cookie.get('access_token');
let warning = null;

class Message extends Component {
  constructor(props){
    super(props);
    this.state = {id: props.from.id, type:props.from.type, name: null, profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Question-mark-blackandwhite.png', message: props.message};
    this.parent = props.parent;
    
  }
  componentDidMount(props){
    this.findUser(this.state.id, this.state.type);
    if(!this.decode(this.state.message)) this.parent.setState({warning:true});
  }
  componentWillReceiveProps(props){
    this.setState({message: props.message});
    
  }

  findUser = (id, type) => {
    axios.get(`${apiServerIP}user?id=${id}&type=${type}`, {headers:{Authorization: token}})
    .then((res) => {
      const user = res.data;
      this.setState({name: user.name, profilePicture: user.profilePicture});
    })
    .catch((err) =>this.setState({name: id + ' (Unknown User)'}));
  }
  decode = (key) => {
    try{
      return jwt.verify(key, clientSecret);
    }catch(err) {
      
      return false;
    }
  }


  render(){
    const userpic = <div className="Messages-rs-profile_picture"><img src={this.state.profilePicture}  height="100%" /></div>;
    if(!this.state.name) return <div/>;
    let account; 

      switch (this.state.type.toLocaleLowerCase()){
        case accTypes[0].toLocaleLowerCase():
          account ='[BA]';
          break;
        case accTypes[1].toLocaleLowerCase():
          account = '[CP]';
          break;
        case accTypes[2].toLocaleLowerCase():
          account = '[MA]';
          break;
        case accTypes[3].toLocaleLowerCase():
          account = '[ADMIN]';
          break;
        default:
        account ='[UNKNOWN]';
      }
    
    return (
      <div className="Messages-rs-msg-wrapper">
        <div className="Messages-rs-msg-user">{userpic} <span style={{marginLeft: '0.5%'}}>{this.state.name}{account}:</span></div> {!this.decode(this.state.message) ? <div className="Messages-rs-msg-data" style={{color:'red'}}>{this.state.message}</div> : <div className="Messages-rs-msg-data">{this.decode(this.state.message)}</div>}
      </div>
    )
  }
}

class Messages extends Component {
  constructor(){
    super();
    this.state = {convo: {}, convos: [], warning: null}
    this.warning = null;
  }

  componentWillMount= () =>{
    
    if(!token) return history.back();
    axios.get(`${frontServerIP}convos`, {headers:{Authorization: token}})
    .then((res) => {
      this.setState({convos: res.data})
    })
    .catch((err) => console.log(err));
  }


  encode = (msg) => jwt.sign(msg, clientSecret);

  getConvo = (id) => {
    axios.get(`${frontServerIP}convos`, {headers:{Authorization: token}})
    .then((res) => {
      let convo = res.data.filter((c) => {
        return c.id === id;
      })[0];
      console.log(convo);
      
      this.setState({convos: res.data, convo});
    })
    .catch((err) => console.log(err));
  }

  addMessage = (e) => {
    e.preventDefault();

    const message = this.encode(e.target.msg ? e.target.msg.value : e.target.value);
    const msg = {
      from: {id:this.props.user._id, type: this.props.user.type.toLocaleLowerCase()},
      to: this.state.convo.userids,
      message,
      timestamp: Date.now()
    }
    e.target.msg ? e.target.msg.value = "": e.target.value = "";
    axios.post(`${frontServerIP}message`, msg, {headers:{Authorization: token}})
    .then((res) => {
      console.log(res.data);
      
      this.setState({convos: res.data.convos,convo: res.data.convo});
    })
    .catch((err) => {
      alert(err);
    });
  }

  inputKey = (e) => e.keyCode === 13 && e.keyCode !== 16 ? this.addMessage(e) : null;

  

  render(){
    const msgs = this.state.convo.messages || [];
    const cons = this.state.convos || [];
    const groups = [];
    const personal = [];

    return (
      <div className="Messages-wrapper">
        <div className="Messages-ls">
          <div className="Messages-ls-content">
            <div className="Messages-header">{this.props.user._id}</div>
            <div className="Messages-ls-controls">
              <div>INBOX</div>
              <div>OUTBOX</div>
            </div>
            {cons.map((convo, i) => {
              if(convo.messages.length === 1 && convo.messages[0].from.id === this.props.user._id) return;
              
              const convoBtn = <div className="Messages-ls-convo_btn" key={i} onClick={() =>{this.getConvo(convo.id);}}>{convo.userids.length > 2 ? convo.userids.length + ' - Users' : convo.userids.map((user) => user.id !== this.props.user._id ? user.id : undefined)}</div>;
              convo.userids.length > 2 ? groups.push(convoBtn) : personal.push(convoBtn);              
            })}
            <div className="Messages-ls-cat-wrapper">
              {personal}
            </div>
            <div className="Messages-ls-cat-wrapper">
              <div className="Messages-ls-content-title">Group Messages</div>
              {groups}
            </div>
          </div>
        </div>
        <div className="Messages-rs">
          <div className="Messages-header">MESSAGES</div>
          {this.state.warning ? <div className="Messages-warning">[WARNING UNPROTECTED MESSAGES FOUND]</div> : null }
          
          {!process.env.PRODUCTION && this.state.convo.id ? <div className="Messages-header"> {this.state.convo.userids.map((user) => user.id !== this.props.user._id ? user.id : null).join(' ')} <br/> convo ID: {this.state.convo.id}</div> : null}
          
          <div className="Messages-rs-content">
           {
              msgs.map((item, i) => {
              
              return <Message key={i} parent={this} {...item} />;
            })}
          </div>
          {this.state.convo.id ? <form id='form' onSubmit= {(e) => this.addMessage(e)} className="Messages-rs-form">
            <textarea onKeyDown={(e) => this.inputKey(e)} name="msg" className="Messages-rs-form-input" type="text"/>
            <input type="submit" value="SEND" />
          </form> : null}
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