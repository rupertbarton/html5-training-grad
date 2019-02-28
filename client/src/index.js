import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store/configure-store';
const store = configureStore(); //sets initial state

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
