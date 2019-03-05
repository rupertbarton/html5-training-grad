import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import axios from "axios";
// import thunk from "redux-thunk";
// import logo from './logo.svg';
import './App.css';
import AggregatedOrderBook from'../components/AggregatedOrderBook/AggregatedOrderBook'
// import { getOrderBookStart, getOrderBookReceived, getOrderBookError} from '../components/AggregatedOrderBook/actions';
import AccountAdder from '../components/AccountAdd/AccountAdd';
import AccountSelector from'../components/AccountSelector/AccountSelector'
import AccountOrderBook from '../components/AccountOrderBook/AccountOrderBook';
import NewOrderForm from '../components/NewOrderForm/NewOrderForm';
import TradeHistory from '../components/TradeHistory/TradeHistory';

export class App extends Component {
  render() {
    if (this.props.newOrderDelivered){
      this.forceUpdate
    }
    return (
      <div className="App">
      
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Rupert's Amazing Trader</h1>
          <h2 className="Account-name">AccountName: {this.props.currentAccount}</h2>
          <div className = "App-change-accounts">
          <TradeHistory />
          <AccountAdder />
          <AccountSelector />
          <AccountOrderBook />
          <NewOrderForm />
          </div>
        </header>

        <AggregatedOrderBook name={this.props.name} />
      </div>
    );
  }
}

App.propTypes = {
  // name: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    currentAccount: state.AccountSelector.currentAccount,
    newOrderDelivered: state.NewOrderForm.delivered
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);