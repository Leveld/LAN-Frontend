import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware  } from 'redux';
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
  Stats, 
  Header,
  Footer, 
  Error,
  SettingsSidebar
} from './components';
import {withCookies ,CookiesProvider, Cookies} from 'react-cookie';
const {apiServerIP} = require('capstone-utils');
const {accTypes} = require('../server/config.json');

const ver = 'v1.0';



import reducers from './reducers';
import './styles/index.css';
import Auth from './components/Auth/Auth';
const auth = new Auth();
const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // <--- REDUX DEBUGGER
const cookie = new Cookies();


class App extends Component {
  constructor(){
    super();
    this.state = {type: null, settings: false};
  }

  componentDidMount(){
    const akey = cookie.get('access_token');
    if(akey && akey.length === 32){
      axios.get(`${apiServerIP}user`, {headers:{Authorization:`Bearer ${akey}`}})
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
          <div style={{display: 'flex',  flexDirection: 'row', width: '100%', height: '100%'}}>
            <SettingsSidebar toggle={this.state.settings} />
            <Route exact path="/" component={() => 
              this.state.type === 'User' ? <Redirect to={'/register'}/> : <Home />
              }/>
            <Route path="/profile" component={() => 
              accTypes.includes(this.state.type) ? <Profile /> : this.state.type === 'User' ? <Redirect to={'/register'} /> : <Redirect to={'/'}/>
            }/>
            <Route path="/error" component={Error} />
            <Route path='/register' component={() => <Registration auth={auth} /> }/>
          </div>
        <Footer/>        
        </div>   
    );
  }
}





render(
  <Router>
    <Provider store={store}>
      {<App />}
    </Provider>
  </Router>, document.getElementById('root'));
