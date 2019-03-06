import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import io from "socket.io-client"
import {getOrderBookReceived} from './components/AggregatedOrderBook/actions';
import {getOrderBookReceived as accountRecieved,} from './components/AccountSelector/actions';


import configureStore from './KeyFiles/configure-store';
const store = configureStore();

let socket = io.connect('http://localhost:3001');

socket.on('connectionComplete', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

socket.on('newOrderMade', function (data) {
  store.dispatch(getOrderBookReceived(data.slice(0,2)))
  socket.emit("requestUpdateAccountOrders", store.getState().AccountSelector.currentAccount)
});


socket.on('accountOrdersSent', function (data){
  store.dispatch(accountRecieved(data))
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
