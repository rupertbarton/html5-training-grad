import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from "axios";
import thunk from "redux-thunk";
// import logo from './logo.svg';
import './App.css';
import AggregatedOrderBook from'../components/AggregatedOrderBook/AggregatedOrderBook'
import AccountSelector from'../components/AccountSelector/AccountSelector'
import { getOrderBookStart, getOrderBookReceived, getOrderBookError} from '../components/AggregatedOrderBook/actions';

export class App extends Component {
  render() {
    return (
      <div className="App">
      
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">{this.props.name}'s Amazing Trader</h1>
          <div className = "App-change-accounts">
          <AccountSelector />
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
    // name: state.app.name
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  //   getOrders: () => {
  //     dispatch(getOrderBookStart())
  //     axios.get("http://localhost:3001/").then(
  //       (response) => {
  //         dispatch(getOrderBookReceived(response.data))
  //       }
  //     ).catch((err) => {getOrderBookError()}
  //     )
    }
  // }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);