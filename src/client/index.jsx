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
  CPHome, 
  Profile, 
  Home,
  Registration, 
  Stats, 
  Header,
  Footer, 
  Error
} from './components';
import {withCookies ,CookiesProvider, Cookies} from 'react-cookie';
const {apiServerIP} = require('capstone-utils');
const {accTypes} = require('../server/config.json');



import reducers from './reducers';
import './styles/index.css';
import Auth from './components/Auth/Auth';
const auth = new Auth();
const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // <--- REDUX DEBUGGER
const cookie = new Cookies();


class App extends Component {
  constructor(){
    super();
    this.state = {type: null};
  }

  componentWillMount(){
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
    
    // // MOCK DATA
    // #############
    const list = [
      { 
        title: 'CP-HOME', 
        bg: 'black', 
        txt:'green', 
        image: 'http://www.seriouseats.com/recipes/images/2016/10/20161004-baked-potato-vicky-wasik-10-1500x1125.jpg', 
        blob: <CPHome user={null} />
      },         
      {
        title: 'Profile', bg: 'red', txt:'purple', image: 'https://venturebeat.com/wp-content/uploads/2017/08/youtube_logo_old_new1.gif?fit=578%2C289&strip=all', 
        blob: <Profile user={null} />
      },
      {
        title: 'Register', bg: 'green', txt:'white', image: 'http://d21toastmasters.org/wp-content/uploads/2016/06/iStock_000017157664XSmall_Register_Button.jpg', 
        blob: <Registration />
      },
      {
        title: 'Lambda', bg: 'blue', txt:'white', image: 'https://www.stratoscale.com/wp-content/uploads/AWS-Lambda.png', 
        blob: <iframe title="LambdaSchool" src="http://lambdaschool.com" height={document.body.scrollHeight + "px"} style={{overflowY: 'auto'}} frameBorder="0" width="100%"/>
      },
    ];
    // #############


    return (
        <div className="app">
          <Header auth={auth} />
          <Route exact path="/" component={() => 
            this.state.type === 'User' ? <Redirect to={'/register'}/> : <Home />
            }/>
          <Route path="/profile" component={() => 
            accTypes.includes(this.state.type) ? <Profile /> : this.state.type === 'User' ? <Redirect to={'/register'} /> : <Redirect to={'/'}/>
          }/>
          <Route path="/error" component={Error} />
          <Route path='/register' component={() => <Registration auth={auth} /> }/>

        <Footer />        
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
