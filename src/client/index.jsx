import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import {
  InfoGraphic,
  InfoGraphicList,
  InfoGraphicDisplay,
  Profile,
  Home,
  Registration,
  Messages,
  Stats,
  Header,
  Footer,
  Error,
  SettingsSidebar,
  Search
} from './components';

import {withCookies ,CookiesProvider, Cookies} from 'react-cookie';
const { apiServerIP, zip} = require('capstone-utils');
const {accTypes} = require('../server/config.json');

const ver = 'v1.0';

import * as actions from './actions';
import reducers from './reducers';
////import './styles/index.css';
import './styles/scss/main.scss';
import Auth from './components/Auth/Auth';
const auth = new Auth();
// const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // <--- REDUX DEBUGGER
const store = createStore(reducers, Object.assign({}, {
  convos: []
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const cookie = new Cookies();


class App extends Component {
  constructor() {
    super();
    this.state = {type: null};
  }

  componentDidMount(){
    if (window.location.href.endsWith('#')) window.location.href = window.location.href.substring(0, window.location.href.length - 1);
    const token = window.localStorage.getItem('access_token') || cookie.get('access_token');
    if(token && token.length === 32){
      axios.get(`${apiServerIP}user`, {headers:{Authorization:`Bearer ${token}`}})
      .then((res) => {
        this.setState({type: res.data.type});
      })
      .catch((err) => {
        console.log(err); //LOG ERROR
      });
    }
  }

  render() {

    return (
        <div className="app">
          <Header auth={auth} app={this}/>
          
          <div>
            <SettingsSidebar />
            <Route exact path="/" component={() =>
              this.state.type === 'User' ? <Redirect to={'/register'}/> : <Home auth={auth} />
              }/>
            <Route path="/profile" component={() =>
              accTypes.includes(this.state.type) ? <Profile /> : this.state.type === 'User' ? <Redirect to={'/register'} /> : history.back()
            }/>
            <Route path="/error" component={Error} />
            <Route path='/register' component={() => <Registration auth={auth} /> }/>
            <Route path='/messages' component={Messages}/>
            
          </div>
        <ConnectedEventListener />
        <Footer/>
        </div>
    );
  }
}

class EventListener extends Component {
  static get events() {
    return {
      conversationChange: 'ConversationChangeEvent'
    }
  }

  static set events(_) {}

  constructor(props) {
    super(props);
    // this.state = {convos: props.convos || []};
    this.startEventListener = this.startEventListener.bind(this);
  }

  // componentWillMount() {
  //   this.setState({convos: this.props.convos});
  // }

  // componentWillReceiveProps(props){
  //   this.setState({convos: props.convos});
  //   console.log('will receive ', props)
  // }


  dispatchEvent(name, data) {
    const event = new CustomEvent(name, { detail: data });
    window.dispatchEvent(event);
    switch (name) {
      case EventListener.events.conversationChange:
        this.props.updateConvo(data.conversation);
        break;
      default:
        break;
    }
  }

  startEventListener() {
    const EVENT_NAME = EventListener.events.conversationChange;
    if (this.eventListener)
      clearInterval(this.eventListener);
    const getConvs = () => {
      return this.props.convos;
    }
    const listener = (async () => {
      const sortByCreatedAt = (a, b) => {
        const aCreated = new Date(a.createdAt);
        const bCreated = new Date(b.createdAt);
        if (aCreated < b.createdAt)
          return -1;
        if (aCreated > b.createdAt)
          return 1;
        return 0;
      };
      const userToken = window.localStorage.getItem('access_token');
      if (!userToken)
        return;
      const conversations = (await axios.get(`${apiServerIP}conversations`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })).data || [];
      const reduxConvs = this.props.convos;
      reduxConvs.sort(sortByCreatedAt);
      conversations.sort(sortByCreatedAt);
      for (let [conv1, conv2] of zip(reduxConvs, conversations)) {
        if (!conv1 || !conv2 || conv1.id !== conv2.id) {
          this.dispatchEvent(EVENT_NAME, { conversation: conv2 });
          continue;
        }
        if (conv1.messages.length !== conv2.messages.length) {
          this.dispatchEvent(EVENT_NAME, { conversation: conv2 });
          continue;
        }
        conv1.messages.sort(sortByCreatedAt);
        conv2.messages.sort(sortByCreatedAt);
        if (JSON.stringify(conv1.messages) !== JSON.stringify(conv2.messages)) {
          this.dispatchEvent(EVENT_NAME, { conversation: conv2 });
        }
      }
    }).bind(this);
    listener();
    this.eventListener = setInterval(listener, 5000);
  }

  stopEventListener() {
    clearInterval(this.eventListener);
  }

  componentWillMount() {
    this.startEventListener();
  }

  componentWillUnmount() {
    this.stopEventListener();
  }

  render() {
    return <div />
  }
}

const mapStateToProps = (state) => {
  return {
    convos: state.convos
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const ConnectedEventListener = connect(mapStateToProps, mapDispatchToProps, null)(EventListener);

render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>, document.getElementById('root'));
