import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import AggregatedOrderBook from '../components/AggregatedOrderBook/AggregatedOrderBook'
import AccountAdder from '../components/AccountAdd/AccountAdd';
import AccountSelector from '../components/AccountSelector/AccountSelector'
import AccountOrderBook from '../components/AccountOrderBook/AccountOrderBook';
import NewOrderForm from '../components/NewOrderForm/NewOrderForm';
import TradeHistory from '../components/TradeHistory/TradeHistory';

export class App extends Component {


  render() {

    return (
      <div className="App">

        <header className="App-header">
          <div className="row container-fluid">
            <div className="col-xl-1"></div>
            <div className="col-xl-9">
              <div className="text-center">
                <h1>Rupert's Amazing Trader</h1>
                <h2 className="Account-name">AccountName: {this.props.currentAccount}</h2>
              </div>
            </div>

            <div className="col-xl-1">
              <AccountAdder />
              <AccountSelector />
            </div>
            <div className="col-xl-1">
            </div>
          </div>
        </header>


        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-2 ">
              <NewOrderForm />
            </div>
            <div className="col-xl-2 ">
              <AggregatedOrderBook name={this.props.name} />
            </div>
            <div className="col-xl-6">
              <AccountOrderBook />
            </div>

            <div className="col-xl-2" >
              <TradeHistory />
            </div>

          </div>
        </div>
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