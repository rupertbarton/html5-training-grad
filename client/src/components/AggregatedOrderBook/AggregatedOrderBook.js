import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import { getOrderBookStart, getOrderBookReceived, getOrderBookError } from './actions';
import DataTable from '../DataTable/DataTableFromArray';


export class AggregatedOrderBook extends Component {

  constructor(props) {
    super(props);
    this.props.getOrders()
    // let n = 10;
  }

  render() {
    if (this.props.fetched) {
      console.log(this.props.aggregatedOrderBook[1])
      return (
        <div className="AggregatedOrderBook">
        <DataTable headings={["Price", "Quantity", "My Share"]} rows={this.props.aggregatedOrderBook[1].reverse()} />

        <DataTable headings={["Price", "Quantity"]} rows={this.props.aggregatedOrderBook[0]} />

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