import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { InfoGraphic, InfoGraphicList, InfoGraphicDisplay, CPHome, Profile, Stats, Header } from './components';

import reducers from './reducers';

import './styles/index.css';

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
        title: 'Lambda', bg: 'blue', txt:'white', image: 'https://www.stratoscale.com/wp-content/uploads/AWS-Lambda.png', 
        blob: <iframe title="LambdaSchool" src="http://lambdaschool.com" height={document.body.scrollHeight + "px"} style={{overflowY: 'auto'}} frameBorder="0" width="100%"/>
      },
    ];
    // #############

    return (
      <Provider store={store}>
        <div className="app">
          <Header />

          {/* LIST */}
          <InfoGraphicList color="orange" title="-DEVELOPMENT-">
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
          </InfoGraphicList>

          {/* DISPLAY */}
          <InfoGraphicDisplay width="100%" height="100%" toggle={0}/>
          <Stats />          
          
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
