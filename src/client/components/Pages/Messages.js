import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {apiServerIP, frontServerIP, IS_DEVELOPMENT, parallelAsync, mapAsync, zip} from 'capstone-utils';
import {Cookies} from 'react-cookie';
import * as actions from '../../actions';
//import '../../styles/Messages.css';
import jwt from 'jsonwebtoken';
import {clientSecret} from '../../../server/secret.json';

const cookie = new Cookies();
const token = window.localStorage.getItem('access_token') || cookie.get('access_token');
let warning = null;
let globalUser = null;

class Conversation extends Component {
  constructor(props) {
    super(props);
  }

  get title() {
    if (!this.props.conversation || !this.props.conversation.title)
      return 'Loading...'
    return this.props.conversation.title;
  }

  set title(_) {}

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const conversation = this.props.conversation;
    if (!conversation)
      return (<div> Loading.... </div>);
    return (
      <div className="button--color-green button--hover-white" style={{ margin: '.5rem', cursor: 'pointer', padding: '.2rem' }} onClick={() => conversation ? this.props.selectConversation(conversation) : null}>
        { this.title }
      </div>
    );
  }
}

class ConversationList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    if (!this.props.user)
      return (<div> Loading.... </div>);
    return (
      <div className="Messages-ls">
        <div className="Messages-ls-content">
          <div className="Messages-header" style={{ padding: '.5rem', background: 'whitesmoke' }}>
            {"Conversations"}
          </div>
          { this.props.conversations.map((conversation, i) => {
            return (<Conversation
              key={i}
              conversation={conversation}
              selectConversation={this.props.selectConversation}
              />);
          }) }
        </div>
      </div>
    );
  }
}

class Message extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this._loadProperties();
  }

  _loadProperties() {
    if (!this.props.message)
      return;
    for (let [key, value] of Object.entries(this.props.message)) {
      if (typeof value === 'function')
        return;
      Object.defineProperty(this, key, {
        get: () => this.props.message[key],
        set: () => undefined,
        enumerable: true,
        configurable: true
      });
    }
  }

  componentWillReceiveProps(props) {
    if (props.message)
      this._loadProperties();
  }

  get message() {
    try{
      return jwt.verify(this.props.message.value, clientSecret);
    }catch (error) {
      return "[WARNING: UNPROTECTED MESSAGE!]";
    }
  }

  get user() {
    return this.props.user;
  }

  set message(_) {}
  set user(_) {}

  render() {
    const message = this.props.message ? this.message : 'Loading...';
    let name = this.author && this.author.name ? this.author.name :
                this.author && this.author.id ? this.author.id : null;
    if (name) {
      name = <Link to={`/profile?id=${this.author.id}&type=${this.author.type}`}>{name}</Link>
    } else {
      name = 'Loading...';
    }
    
    return (
      <div className="pane" style={{fontSize: "calc(1rem + 0.5vw)",display: 'flex', flexDirection: 'column' }}><div style={{whiteSpace: 'nowrap', textDecoration: 'unset', color: 'black'}}>{name}:</div> <div style={{margin: '0 10px',whiteSpace:'pre-line'}}>{message}</div><div style={{whiteSpace: 'nowrap', width: '100%', display: 'flex', justifyContent: 'flex-end', flex: 1, color: "green"}}>{String(this.props.message.updatedAt).split("GMT")[0]}</div></div>
    );
  }
}

class MessagePanel extends Component {
  constructor(props) {
    super(props);
  }

  get title() {
    return this.props.title || 'TITLE';
  }

  get messages() {
    return this.props.messages || [];
  }

  get user() {
    return this.props.user || null;
  }

  set title(_) {}
  set messages(_) {}
  set user(_) {}

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="Messages-rs">
        {/*<div className="Messages-header">Conversation:</div>*/}
        <div className="Messages-header">{ '' }</div>
        {
          this.messages.map((message, i) => {
            return (<Message key={i} message={message} user={this.user} />);
          })
        }
      </div>
    );
  }
}


/* A User data Strucutre */
class UserDS {
  static async retrieveUser(id, type) {
    try {
      const user = await axios.get(`${apiServerIP}user`, {
        params: {
          id, type
        },
        headers: {
          Authorization: token
        }
      });
      if (!user || !user.data)
        return null;
      return new UserDS(user.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  constructor(user) {
    if (user instanceof UserDS)
      return user;
    let { id, type, name, profilePicture, createdAt, updatedAt, ...rest } = user;
    this.id = id;
    this.type = type;
    this.name = name;
    this.profilePicture = profilePicture;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
    this.data = rest;
  }
  equals(user) {
    if (typeof user !== 'object' || user === null)
      return false;
    if (this.id !== user.id)
      return false;
    if (`${this.updatedAt}` !== `${user.updatedAt}`)
      return false;
    if (`${this.createdAt}` !== `${user.createdAt}`)
      return false;
    return true;
  }
}

/* message from server

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

*/

/* A Message data structure */
class MessageDS {
  constructor(message = {}, doLoad = false) {
    if (message instanceof MessageDS)
      return message;
    let { id, author : { authorID, authorType }, conversation, messageType, value, createdAt, updatedAt, readers = [] } = message;
    this.id = id;
    this.author = { id: authorID, type: authorType };
    this.conversation = conversation;
    this.type = messageType;
    this.value = value;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
    this.readers = readers.filter((p) => typeof p === 'object' && p !== null).map(({ readerID, readerType }) => ({ id: readerID, type: readerType}));
    if (doLoad === true)
      return this.load();
  }

  async load() {
    await parallelAsync(
      async () => this.author = !(this.author instanceof UserDS) ?
        await UserDS.retrieveUser(this.author.id, this.author.type) : this.author,
      async () => this.readers = Array.isArray(this.readers) ?
        await mapAsync(this.readers.filter((r) => r != null),
          async (reader) => !(reader instanceof UserDS) && await UserDS.retrieveUser(reader.id, reader.type)) : this.readers
    );
    return this;
  }

  equals(message) {
    if (typeof message !== 'object' || message === null)
      return false;
    if (this.id !== message.id)
      return false;
    if (this.type !== message.type || this.type !== message.messageType)
      return false;
    if (`${this.updatedAt}` !== `${message.updatedAt}`)
      return false;
    if (`${this.createdAt}` !== `${message.createdAt}`)
      return false;
    if (this.value !== message.value)
      return false;
    if (this.conversation instanceof ConversationDS) {
      if (message.conversation instanceof ConversationDS) {
        if (this.conversation.id !== message.conversation.id) // can't go deep else recursion loop
          return false;
      } else {
        if (this.conversation.id !== message.conversation)
          return false;
      }
    } else {
      if (message.conversation instanceof ConversationDS) {
        if (this.conversation !== message.conversation.id)
          return false;
      } else {
        if (this.conversation !== message.conversation)
          return false;
      }
    }
    return true;
  }

}

/*conversation from server

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
  "messages": [ messages from server ]
}

*/

/* A Conversation data structure */
class ConversationDS {
  constructor(conversation = {}, doLoad = false) {
    if (conversation instanceof ConversationDS) {
      if (doLoad === true)
        return conversation.load();
      return conversation;
    }
    let { id, name, description, isGroup, owner : { ownerID, ownerType }, participants, createdAt, updatedAt, messages = [] } = conversation;
    // returns a sort function
    this._sort = (newestFirst = false) => (m1, m2) => {
      const d1 = new Date(m1.updatedAt);
      const d2 = new Date(m2.updatedAt);

      if (d1 < d2)
        return newestFirst ? -1 : 1;
      if (d1 > d2)
        return newestFirst ? 1 : -1;
      return 0;
    };

    let sortOrder = false;
    this.sortMessages = (...newestFirst) => {
      if (newestFirst.length > 0)
        sortOrder = newestFirst[0] === true;
      if (Array.isArray(this.messages))
        this.messages.sort(this._sort(sortOrder));
    }

    this.id = id;
    this.name = name;
    this.description = description;
    this.isGroup = isGroup;
    this.owner = { id: ownerID, type: ownerType };
    this.participants = participants.filter((p) => typeof p === 'object' && p !== null).map(({ participantID, participantType }) => ({ id: participantID, type: participantType}));
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
    this.messages = messages.map((message) =>  {
      if (message.conversation === this.id)
        message.conversation = this;
      return new MessageDS(message);
    });
    if (doLoad === true)
      return this.load();
    this.sortMessages();
  }

  get title() {
    if (this.name)
      return this.name
    return [this.owner]
            .concat(this.participants)
            .filter((user) => user != null && (globalUser ? user.id !== globalUser.id : true))
            .map((user) => user ? user.name || 'Loading...' : 'ERROR')
            .join('-');
  }

  set title(_) {}

  async load() {
    await parallelAsync(
      async () => this.owner = !(this.owner instanceof UserDS) ?
        await UserDS.retrieveUser(this.owner.id, this.owner.type) : this.owner,
      async () => this.participants = Array.isArray(this.participants) ?
        this.participants = await mapAsync(this.participants.filter((p) => p != null),
          async (participant) => (participant instanceof UserDS) ? participant : await UserDS.retrieveUser(participant.id, participant.type)) : this.participants,
      async () => this.messages = Array.isArray(this.messages) ?
        await mapAsync(this.messages, async (message) => await message.load()) : this.messages
    );
    return this;
  }

  /* addMessage
   *   Accepts a MessageDS or a key-value Object. If a message with the same `id` is already stored,
   *   the stored message will be replaced -- but only if data has changed.
   * Parameters:
   *   message: <Object>
   *     A message object from the server.
   *   doLoad: <Boolean>
   *     Whether or not to pull message data from the server.
   *     default: false
   * Returns:
   *   A MessageDS or a Promise which will resolve a MessageDS if doLoad === true
   */
  addMessage(message, doLoad = false) {
    if (!(message instanceof MessageDS)) {
      message = new MessageDS(message);
    }
    const index = this.messages.findIndex((savedMessage) => message.id === savedMessage.id);
    if (index >= 0) {
      const storedMessage = this.messages[index];
      if (storedMessage instanceof MessageDS && !storedMessage.equals(message))
        this.messages[index] = message;
      else if (!(storedMessage instanceof MessageDS) && JSON.stringify(storedMessage) !== JSON.stringify(message))
        this.messages[index] = message;
      else
        message = storedMessage;
    } else {
      this.messages.push(message);
    }
    if (doLoad === true)
      return message.load();
    this.sortMessages();
    return message;
  }

  async postMessage(value, type = 'Chat') {
    try {
      let message = await axios.post(`${apiServerIP}message`, {
        fields: {
          conversation: this.id,
          messageType: type,
          value
        }
      }, {
        headers: {
          Authorization: token
        }
      });
      if (!message || !message.data)
        return null;
      message = message.data;
      message = await this.addMessage(message, true);
      return message;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  equals(conversation) {
    if (this.id !== conversation.id)
      return false;
    if (this.name !== conversation.name)
      return false;
    if (this.description !== conversation.description)
      return false;
    if (`${this.updatedAt}` !== `${conversation.updatedAt}`)
      return false;
    if (`${this.createdAt}` !== `${conversation.createdAt}`)
      return false;
    if (Array.isArray(this.messages)) {
      if (!Array.isArray(conversation.messages) && this.messages.length > 0)
        return false;
      for (let [m1, m2] of zip([...this.messages].sort(this._sort), [...conversation.messages].sort(this._sort))) {
        if (m1 instanceof MessageDS) {
          if (!m1.equals(m2))
            return false;
        } else if (m2 instanceof MessageDS) {
          if (!m2.equals(m1))
            return false;
        } else {
          if (m1.id !== m2.id)
            return false;
          if (m1.updatedAt !== m2.updatedAt)
            return false;
        }
      }
    } else if (Array.isArray(conversation.messages)) {
      if (conversation.messages.length > 0)
        return false;
    }
    return true;
  }
}

class Messenger extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.addConversation = this.addConversation.bind(this);
    this.loadConversations = this.loadConversations.bind(this);
    this.loadConversation = this.loadConversation.bind(this);
    this.onConversationChange = this.onConversationChange.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.selectConversation = this.selectConversation.bind(this);
    this.refresh.bind(this);
  }

  get activeConversation() {
    return this.state.activeConversation;
  }

  get conversations() {
    return this.state.conversations;
  }

  set activeConversation(conversation) {
    this.setState({ activeConversation: conversation });
  }

  set conversations(conversations) {
    this.setState({ conversations: conversations });
  }

  refresh() {
    this.conversations = this.conversations || [];
    this.setState({});
  }

  async addConversation(conversation, doLoad = false) {
    if (typeof conversation !== 'object' || conversation === null)
      return null;
    if (!Array.isArray(this.conversations)) {
      this.state.conversations = [];
    }

    const add = async () => {
      const index = this.conversations.findIndex((conv) => conv.id === conversation.id);
      if (index >= 0) {
        if (!(this.conversations[index] instanceof ConversationDS)) {
          this.conversations[index] = conversation;
          return conversation
        } else {
          if (!this.conversations[index].equals(conversation)) {
            this.conversations[index] = conversation;
            return this.conversations[index];
          }
        }
        await this.conversations[index].load();
        return this.conversastions[index];
      }
      this.conversations.push(conversation);
      return conversation;
    };

    if (!(conversation instanceof ConversationDS))
      conversation = await new ConversationDS(conversation, true)
    conversation = await add();
    await conversation.load();
    if (this.state.activeConversation && conversation.id === this.state.activeConversation.id)
      this.setState({ activeConversation: conversation })
    else
      this.refresh();
  }

  componentWillMount() {
    this.setState({
      conversations: this.props.conversations || [],
      activeConversation: null
    });
  }

  componentDidMount() {
    if (this.props.convos) {
      this.loadConversations(this.props.convos)
    }
    window.addEventListener('ConversationChangeEvent', this.onConversationChange);
  }

  componentWillUnmount() {
    window.removeEventListener('ConversationChangeEvent', this.onConversationChange);
  }

  componentWillReceiveProps(props) {
    if (props.user) {
      globalUser = props.user;
    }
  }

  async loadConversations(conversations) {
    if (!Array.isArray(conversations))
      return;
    await parallelAsync(
      ...conversations.map((conversation) =>
        async () => this.addConversation(await this.loadConversation(conversation)))
    );
  }

  async loadConversation(conversation) {
    if (!(conversation instanceof ConversationDS))
      conversation = new ConversationDS(conversation);
    await conversation.load();
    return conversation;
  }

  onConversationChange(event) {
    const conversation = event.detail.conversation;
    this.addConversation(conversation, true);
  }

  selectConversation(conversation) {
    this.activeConversation = conversation;
  }

  onSubmit(event) {
    event.preventDefault();
    if (!this.activeConversation)
      return;
    const encode = (msg) => jwt.sign(msg, clientSecret);
    const input = event.target.msg || event.target;
    
    if (!input || !input.value || input.value === '')
      return;
    const message = encode(input.value);
    this.activeConversation.postMessage(message).then(() => {
      this.refresh();
      input.value = "";
      
    });
    document.getElementById("msg").focus();
  }

  async postMessage(conversation, message) {
    if (!conversation)
      return false;
    if (typeof conversation === 'string') {
      for (let conv of this.conversations) {
        if (conv.id === conversation) {
          if (conv instanceof ConversationDS) {
            try {
              await conv.postMessage(message);
              return true;
            } catch (error) {
              return false;
            }
          } else {
            try {
              const index = this.conversations.indexOf(conv);
              try {
                this.conversations[index] = await new ConversationDS(conv, true);
              } catch (error) {
                console.error(error);
                return false;
              }
              await this.conversations[index].postMessage(message);
              return true;
            } catch (error) {
              return false;
            }
          }
        }
      }
    } else {
      if (typeof conversation !== 'object' || conversation === null)
        return false;
      let index = -1;
      for (let conv of this.conversations) {
        index++;
        if (!(conv instanceof ConversationDS)) {
          try {
            this.conversations[index] = await new ConversationDS(conv, true);
          } catch (error) {
            console.error(error);
            return false;
          }
        }
        if (conv.id === conversation.id) {
          try {
            await conv.postMessage(message);
            return true;
          } catch (error) {
            console.error(error);
            return false;
          }
        }
      }
      try {
        await new ConversationDS(conversation).postMessage(message);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }

  render() {
    // if(!this.props.authenticated) return <Redirect to='/' />;
    if (!this.props.user || !this.props.user.name)
      return (<div> Loading... </div>);
    if (this.activeConversation)
      this.activeConversation.sortMessages(true);
    return (
      <div className="Messages-wrapper">
        {/* Conversation List */}
        <ConversationList
          conversations={this.state.conversations}
          user={this.props.user}
          selectConversation={this.selectConversation}
          />
        {/* MessagePanel */}
        <MessagePanel
          title={ "Messages" }
          user={this.props.user}
          messages={this.activeConversation ? this.activeConversation.messages : []}
          />
        {/* Submit Button */}
        {this.state.activeConversation &&
          <form onSubmit= {(e) => this.onSubmit(e)} className="Messages-rs-form">
            <textarea
              onKeyPress={(event) => event.key === 'Enter' && event.key !== 'Shift' ? this.onSubmit(event) : undefined}
              name="msg"
              id="msg"
              className="Messages-rs-form-input"
              type="text"
              autoFocus
              />
            <input className="button button--color-green" type="submit" value="SEND" />
          </form>
        }
      </div>
    );
  }
}

// class Messages extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { activeConvo: null, convoID: null, activeMessages: [], otherUsers: [], mainDiv: null };
//   }

//   onConversationChange = (event) => {
//     const convo = event.detail.conversation;
//     console.log('convo changed: ', convo.id);
//     if (this.state.activeConvo && this.state.activeConvo.id === convo.id) {
//       this.state.activeConvo.messages = convo.messages;
//       this.setState({ activeConvo: this.state.activeConvo });
//     } else {
//       this.loadMessageData();
//     }
//   }

//   componentDidMount = () => {
//     if(!token) return history.back();
//     this.loadMessageData();
//     window.addEventListener('ConversationChangeEvent', this.onConversationChange);
//   }

//   componentWillUnmount = () => {
//     window.removeEventListener('ConversationChangeEvent', this.onConversationChange);
//   }

//   componentWillReceiveProps = (props) => {
//     console.log('=====user', this.props.user)
//     // this.setState({mainDiv: null});
//     // if (props.convos) {
//     //   if (!this.state.convos || )
//     // }
//   };

//   addMessage = async (e) => {
//     e.preventDefault();
//     if (!this.state.activeConvo)
//       return;
//     const message = this.encode(e.target.msg.value);
//     const msg = {
//       conversation: this.state.activeConvo.id,
//       value: message,
//       messageType: 'Chat'
//     }
//     try {
//       const updatedConvo = await axios.post(`${apiServerIP}message`, { fields: msg }, {headers:{Authorization: token}});
//       if (updatedConvo && updatedConvo.data) {
//         // this.props.updateConvo(updatedConvo.data);
//         console.log('============');
//         console.log(updatedConvo.data);
//         console.log('============');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   loadMessageData = async () => {
//     if (!(Array.isArray(this.props.convos) && this.props.user))
//       return null;
//     if (!this.state.mainDiv)
//       this.setState({ mainDiv: (<div>Loading....</div>)});
//     const array = await mapAsync(this.props.convos, async (convo, i) => {
//       const findUser = async (id, type) => {
//         try {
//           let user = await axios.get(`${apiServerIP}user`, {
//             params: {
//               id, type
//             },
//             headers: {
//               Authorization: token
//             }
//           });
//           if (!user || !user.data)
//             return;
//           return user.data;
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       let users = convo.participants.concat([{ participantID: convo.owner.ownerID, participantType: convo.owner.ownerType }])
//         .filter(({ participantID, participantType }) => !(participantID === this.props.user.id && participantType === this.props.user.type))
//         .map(({ participantID, participantType }) => ({ id: participantID, type: participantType }));

//       await parallelAsync(...users.map((user) => {
//         return async () => {
//           const userData = await findUser(user.id, user.type);
//           if (!userData)
//             return;
//           const { name, profilePicture } = userData;
//           user.name = name;
//           user.profilePicture = profilePicture;
//         };
//       }));

//       users = users.filter((user) => user && user.name && user.id && user.type);
//       if (!this.state.activeConvo)
//         this.setState({ activeConvo: convo })
//       // if (this.state.activeConvo && convo.id === this.state.activeConvo.id) {
//       //   console.log('=================setting active convo')
//       //   this.setState({ activeConvo: convo });
//       // }
//       return <div key={i} onClick={() => console.log('=================click') || this.setState({ activeConvo: convo, otherUsers: users })}>{users.map((user) => `${user.name}`).join("-")}</div>
//     });
//     if (this.state.mainDiv) {
//       for (let [oldConvos, newConvos] of zip(this.state.mainDiv, array)) {
//         console.log(oldConvos, newConvos)
//         if (oldConvos !== newConvos) {
//           this.setState({ mainDiv: array });
//           break;
//         }
//       }
//     } else {
//       this.setState({ mainDiv: array });
//     }
//   };

//   render () {
//       return (
//       <div className="Messages-wrapper">
//         <div className="Messages-ls">
//           <div className="Messages-ls-content">
//             <div className="Messages-header">{this.props.user.id}</div>
//             { this.state.mainDiv }
//           </div>
//         </div>
//         <div className="Messages-rs">
//           <div className="Messages-header">MESSAGES</div>
//           {IS_DEVELOPMENT && this.state.activeConvo && this.state.activeConvo.id ? <div className="Messages-header">convo ID: {this.state.activeConvo.id}</div> : null}
//           <div>{warning}</div>
//           {this.state.activeConvo && this.state.activeConvo.messages.map((message, i) => {
//             const author = message.author;
//             let user;
//             if (this.props.user.id === author.authorID && this.props.user.type === author.authorType)
//               user = this.props.user;
//             else
//               user = this.state.otherUsers.find((user) => user.id === author.authorID && user.type === author.authorType);
//             if (user)
//               Object.assign(author, user);
//             return <Message key={i} {...message} />;
//           })}
//           <form onSubmit= {(e) => this.addMessage(e)} className="Messages-rs-form">
//             <textarea name="msg" className="Messages-rs-form-input" type="text"/>
//             <input type="submit" value="SEND" />
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth,
    user: state.user,
    convos: state.convos
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null)(Messenger);
