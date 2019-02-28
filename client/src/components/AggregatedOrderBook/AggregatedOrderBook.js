import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from "axios";
import thunk from "redux-thunk";
import { getOrderBookStart, getOrderBookReceived, getOrderBookError} from './actions';


export class AggregatedOrderBook extends Component {

  constructor(props) {
    super(props);
    this.state = { order: [1, 2, 3, 4, 5] };
    this.props.getOrders()
    let n = 10;
    let buyQuantity = []
    let buyPrice = []
    let sellQuantity = []
    let sellPrice = []
  }

  render() {
    console.log(this.props.aggregatedOrderBook)
    if(this.props.fetched){
      for (let i=0; i<this.props.aggregatedOrderBook[0])

    return (
      <div className="AggregatedOrderBook">
      <h1>{this.state.order}</h1>
      <p>{this.props.aggregatedOrderBook}
      {String(this.props.fetched)}</p>
      </div>
    );
    }
    else{
      return(
        <p>LOADING.....</p>
      )
    }
  }
  }


function mapStateToProps(state) {
  console.log(state.AggregatedOrderBook.aggregatedOrderBook)
  return {
    aggregatedOrderBook: state.AggregatedOrderBook.aggregatedOrderBook,
    fetched: state.AggregatedOrderBook.fetched
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
      ).catch((err) => {getOrderBookError()}
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AggregatedOrderBook);
// export default AggregatedOrderBook;