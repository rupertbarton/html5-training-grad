import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from "axios";
// import thunk from "redux-thunk";
import { getOrderBookStart, getOrderBookReceived, getOrderBookError } from './actions';
import DataTable from '../DataTable/DataTable';


export class AggregatedOrderBook extends Component {

  constructor(props) {
    super(props);
    this.state = { order: [1, 2, 3, 4, 5] };
    this.props.getOrders()
    // let n = 10;
    this.buyQuantity = []
    this.buyPrice = []
    this.sellQuantity = []
    this.sellPrice = []
  }

  render() {
    if (this.props.fetched) {
      return (
        <div className="AggregatedOrderBook">
        <DataTable headings={["Price", "Quantity", "My Share"]} rows={this.props.aggregatedOrderBook[0][1].reverse()} />

        <DataTable headings={["Price", "Quantity"]} rows={this.props.aggregatedOrderBook[0][0]} />

        </div>
      );
    }
    else if(this.props.fetching) {
      return (
        <p>LOADING.....</p>
      )
    }
    else{
      return(<p>Error</p>)
    }
  }
}


function mapStateToProps(state) {
  return {
    aggregatedOrderBook: state.AggregatedOrderBook.aggregatedOrderBook,
    fetched: state.AggregatedOrderBook.fetched,
    fetching: state.AggregatedOrderBook.fetching
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => {
      dispatch(getOrderBookStart())
      axios.get("http://localhost:3001/").then(
        (response) => {
          dispatch(getOrderBookReceived(response.data))
        }
      ).catch((err) => { getOrderBookError() }
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AggregatedOrderBook);
// export default AggregatedOrderBook;