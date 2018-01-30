import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

import './styles/index.css';

const store = createStore(reducers);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <p> Hello World </p>
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
