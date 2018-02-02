import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { InfoGraphicList, InfoGraphicDisplay } from './components';

import reducers from './reducers';

import './styles/index.css';

const store = createStore(reducers);

class App extends Component {

  render() {
    // // MOCK DATA
    const list = [
<<<<<<< HEAD
      {title: 'ExaMple', color: 'red', image: 'https://venturebeat.com/wp-content/uploads/2017/08/youtube_logo_old_new1.gif?fit=578%2C289&strip=all'},
      {title: 'EMANON',color: 'red', image: 'https://venturebeat.com/wp-content/uploads/2017/08/youtube_logo_old_new1.gif?fit=578%2C289&strip=all',
=======
      {title: 'ExaMple', bgColor: 'red', txtColor: 'white', image: 'https://venturebeat.com/wp-content/uploads/2017/08/youtube_logo_old_new1.gif?fit=578%2C289&strip=all'},
      {title: 'EMANON',bgColor: 'red', txtColor: 'white', image: 'https://venturebeat.com/wp-content/uploads/2017/08/youtube_logo_old_new1.gif?fit=578%2C289&strip=all', 
>>>>>>> 32ef78c7f01ba5ab889770b51b8a2bad6272f738
      blob:
        <div className="IG-display-blob">
          <div>NO CONTENT</div>
          <div>¯\_(ツ)_/¯</div>
        </div>},
    ];
    return (
      <Provider store={store}>
        <div className="app">
<<<<<<< HEAD
          <InfoGraphicList color="orange" list={list}/>
          <InfoGraphicDisplay />
=======
          {/* INFO GRAPHICS */}
          
            <IGList bgColor="orange"  list={list}/>
            <IGDisplay /> 
         
>>>>>>> 32ef78c7f01ba5ab889770b51b8a2bad6272f738
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
