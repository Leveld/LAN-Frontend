import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
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



import reducers from './reducers';
import './styles/index.css';
import Auth from './components/Auth/Auth';
const auth = new Auth();
const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // <--- REDUX DEBUGGER



class App extends Component {

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

      <Router>
      <Provider store={store}>
        <div className="app">
          <Header auth={auth} />
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile}/>
          <Route path="/error" component={Error} />
          <Route path='/register' component={Registration}/>

     
          
          {/* LIST */}
          {/*<InfoGraphicList color="orange" title="-DEVELOPMENT-">
            {list.map((item, i) => {
              return (
                <InfoGraphic key={i} {...item}>
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color:'white', width: '100%', height: '100%'}}>
                    <div>NO DATA</div>
                  </div>
                </InfoGraphic>
              );
            })}
            
            <div style={{display: 'flex', justifyContent: 'center', alignContent:'center', marginLeft: '2%'}} >
              <img className="IG-add" style={{background: 'red'}}src={'/images/_btn/plus.png'} alt="Add" height="100%" width="100%"/>
            </div>
          </InfoGraphicList>*/}

          {/* DISPLAY */}
          {/*}
          <InfoGraphicDisplay width="100%" height="100%" toggle={0}/>
          <Stats /> }         
        */}
        <Footer />        
        </div>
      </Provider>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));
