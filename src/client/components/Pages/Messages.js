import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import {apiServerIP, frontServerIP, IS_DEVELOPMENT, parallelAsync, mapAsync} from 'capstone-utils';
import {Cookies} from 'react-cookie';
import * as actions from '../../actions';
import '../../styles/Messages.css';
import jwt from 'jsonwebtoken';
import {clientSecret} from '../../../server/secret.json';

const cookie = new Cookies();
const token = window.localStorage.getItem('access_token') || cookie.get('access_token');
let warning = null;

class Message extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: props.id,
      author: props.author, // authorID authorType name profilePicture id type
      messageType: props.messageType,
      conversation: props.conversation,
      message: props.value,
      createdAt: props.createdAt
    };

  }

  // componentWillMount(){
  //   this.findUser(this.state.id);
  // }

  // findUser = async (id, type) => {
  //   try {
  //     let userData = await axios.get(`${apiServerIP}user`, {
  //       params: {
  //         id, type
  //       },
  //       headers: {
  //         Authorization: token
  //       }
  //     });
  //     if (!user || !user.data)
  //       return;
  //     user = user.data;
  //     this.setState({
  //       name: user.name,
  //       profilePicture: user.profilePicture,
  //       type: user.type
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  decode = (key) => {
    try{
      return jwt.verify(key, clientSecret);
    }catch(err) {
      return warning = "[WARNING: UNPROTECTED MESSAGE!]";
    }
  }


  render() {
    if(!this.state.author.name) return <div> LOADING... </div>;
    if(this.decode(this.state.message) === "[UNPROTECTED]") return warning = "[WARNING: UNPROTECTED MESSAGE!]";
    return (
      <div style={{whiteSpace: 'pre-line'}}>{this.state.author.name }: {this.decode(this.state.message)}</div>
    );
  }
}

class Messages extends Component {
  constructor(props){
    super(props);
    this.state = { convoID: null, activeMessages: [], otherUsers: [], mainDiv: null };
  }

  componentDidMount = () => {
    if(!token) return history.back();
  }

  componentWillReceiveProps = (props) => {
    this.state.mainDiv = null;
  };

  encode = (msg) => jwt.sign(msg, clientSecret);

  addMessage = async (e) => {
    e.preventDefault();
    const message = this.encode(e.target.msg.value);
    const msg = {
      conversation: this.state.convoID,
      value: message,
      messageType: 'Chat'
    }
    try {
      const updatedConvo = await axios.post(`${apiServerIP}message`, msg, {headers:{Authorization: token}});
      this.props.updateConvo(updatedConvo);
    } catch (error) {
      console.error(error);
    }
  }

  render () {
    const loadMessageData = async () => {
      this.setState({mainDiv: (
      <div className="Messages-wrapper">
        <div className="Messages-ls">
          <div className="Messages-ls-content">
            <div className="Messages-header">{this.props.user.id}</div>
            {Array.isArray(this.props.convos) ? await mapAsync(this.props.convos, async (convo, i) => {
              console.log(convo);
              if(convo.messages.length === 1 && convo.messages[0].author.authorID === this.props.user.id) return;

              const users = convo.participants.concat([{ participantID: convo.owner.ownerID, participantType: convo.owner.ownerType }])
                .filter(({ participantID, participantType }) => participantID !== this.props.user.id && participantType !== this.props.user.type)
                .map(({ participantID, participantType }) => ({ user: { id: participantID, type: participantType }}));

              await parallelAsync(...users.map((user) => {
                return async () => {
                  const { name, profilePicture } = await findUser(user.id, user.type);
                  user.name = name;
                  user.profilePicture = profilePicture;
                };
              }));

              users.map((user) => console.log(`User Name: ${user.name}`));
              return <div key={i} onClick={() => this.setState({ convoID: convo.id, activeMessages: convo.messages, otherUsers: user })}>{users.map((user) => user.id).join("-")}</div>
            }) : null }
          </div>
        </div>
        <div className="Messages-rs">
          <div className="Messages-header">MESSAGES</div>
          {IS_DEVELOPMENT && this.state.convoID ? <div className="Messages-header">convo ID: {this.state.convoID}</div> : null}
          <div>{warning}</div>
          {this.state.activeMessages.map((message, i) => {
            const author = message.author;
            let user;
            if (this.props.user.id === author.authorID && this.props.user.type === author.authorType)
              user = this.props.user;
            else
              user = this.state.otherUsers.find((user) => user.id === author.authorID && user.type === author.authorType);
            if (user)
              Object.assign(author, user);
            return <Message key={i} {...message} />;
          })}
          <form onSubmit= {(e) => this.addMessage(e)} className="Messages-rs-form">
            <textarea name="msg" className="Messages-rs-form-input" type="text"/>
            <input type="submit" value="SEND" />
          </form>
        </div>
      </div>
      )});
    }

    if (this.state.mainDiv instanceof Promise) {
      return (
        <div> loading... </div>
      );
    } else {
      if (this.state.mainDiv === null)
        loadMessageData().catch(console.error);
      return this.state.mainDiv || (<div> Loading... </div>);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    convos: state.convos
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null)(Messages);



/*

{
  "id": "5a9f1f08f17db837807a5de5",
  "isGroup": false,
  "owner": {
    "ownerID": "5a9f1bbca71f0218b8a0c4dd",
    "ownerType": "ContentProducer"
  },
  "name": null,
  "description": null,
  "participants": [
    {
      "participantID": "5a9f1bdca71f0218b8a0c4df",
      "participantType": "ContentProducer"
    }
  ],
  "createdAt": "2018-03-06T23:06:49.004Z",
  "updatedAt": "2018-03-07T05:01:09.726Z",
  "messages": [
    {
      "id": "5a9f739c7831b9105c2bd90b",
      "author": {
        "authorID": "5a9f1bbca71f0218b8a0c4dd",
        "authorType": "ContentProducer"
      },
      "conversation": "5a9f1f08f17db837807a5de5",
      "messageType": "Chat",
      "value": "Hey there dood",
      "createdAt": "2018-03-07T05:07:40.473Z",
      "updatedAt": "2018-03-07T05:07:40.473Z",
      "readers": [
        {
          "readerID": "5a9f1bdca71f0218b8a0c4df",
          "readerType": "ContentProducer"
        }
      ]
    }
  ]
}


*/

































