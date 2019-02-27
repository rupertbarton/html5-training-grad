import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from "axios";
import thunk from redux-thunk
// import logo from './logo.svg';
import './App.css';
import AggregatedOrderBook from'../components/AggregatedOrderBook/AggregatedOrderBook'
import { getOrderBook } from '../components/AggregatedOrderBook/actions';

export class App extends Component {
  render() {
    return (
      <div className="App">
      
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">{this.props.name}'s Amazing Trader</h1>
          <button className = "change-accounts-button">Change Accounts</button>
        </header>

        <AggregatedOrderBook name={this.props.name} />
      </div>
    );
  }
}

console.log(axios.get("http://localhost:3001/"))

App.propTypes = {
  name: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    // name: state.app.name
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => {
      dispatch(getOrderBook())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);