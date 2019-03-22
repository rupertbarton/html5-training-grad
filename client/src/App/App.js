import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import AggregatedOrderBook from '../components/AggregatedOrderBook/AggregatedOrderBook'
import AccountAdder from '../components/AccountAdd/AccountAdd';
import AccountSelector from '../components/AccountSelector/AccountSelector'
import AccountOrderBook from '../components/AccountOrderBook/AccountOrderBook';
import NewOrderForm from '../components/NewOrderForm/NewOrderForm';
import TradeHistory from '../components/TradeHistory/TradeHistory';
import D3Graph from '../components/D3Graph/D3Graph';

export class App extends Component {


  render() {

    return (
      <div className="App">

        <header className="App-header">
          <div className="row container-fluid">
            <div className="col-xl-3">

            </div>
            <div className="col-xl-7">
              <div className="text-center">
                <h1>Rupert's Amazing Trader</h1>
                <h2 className="Account-name">AccountName: {this.props.currentAccount}</h2>
              </div>
            </div>

            <div className="col-xl-1">
              <AccountAdder />
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
            <div className="col-xl-1 ">
              <AggregatedOrderBook name={this.props.name} />
            </div>
            <div className="col-xl-7">
            {/* { this.props.fetchedAggregatedOrderBook && (this.props.data[0].length>0 || this.props.data[1].length>0) ? (<D3Graph />) : (<div> </div>)} */}
            { this.props.fetchedAggregatedOrderBook ? (<D3Graph />) : (<div> </div>)}
              <AccountOrderBook />
            </div>

            <div className="col-xl-2" >
            <AccountSelector />
              <TradeHistory />
            </div>

          </div>
        </div>
          {this.props.serverUrl}
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
    newOrderDelivered: state.NewOrderForm.delivered,
    fetchedAggregatedOrderBook: state.AggregatedOrderBook.fetched,
    serverUrl: state.serverUrl,
    data: state.AggregatedOrderBook.graphData,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);