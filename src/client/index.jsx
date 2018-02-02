import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {IGList, IGDisplay} from './components';

import reducers from './reducers';

import './styles/index.css';

const store = createStore(reducers);

class App extends Component {

  render() {
    // // MOCK DATA
    const list = [
      {title: 'ExaMple', image: 'https://venturebeat.com/wp-content/uploads/2017/08/youtube_logo_old_new1.gif?fit=578%2C289&strip=all'},
      {title: 'EMANON', image: 'https://venturebeat.com/wp-content/uploads/2017/08/youtube_logo_old_new1.gif?fit=578%2C289&strip=all', 
      blob:
        <div className="IG-display-blob">
          <div>NO CONTENT</div>
          <div>¯\_(ツ)_/¯</div>
        </div>},
    ];
    return (
      <Provider store={store}>
        <div className="app">
          {/* INFO GRAPHICS */}
          {/* 
            <IGList list={list}/>
            <IGDisplay /> 
          */}
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
