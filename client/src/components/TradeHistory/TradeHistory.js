import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTable from '../DataTable/DataTableForTradeHistory';


export class AggregatedOrderBook extends Component {

  render() {
    if(this.props.tradeHistory==0 && !this.props.fetching){
      return(
        <p> No Trades Found</p >
        )
      }
      else if(this.props.fetched) {
        return (
          <div className="AccountOrderBook">
          <DataTable headings={["Price", "Quantity","time"]} rows={this.props.tradeHistory} />
        </div>
      );
    }
    else if (this.props.fetching) {
      return (
        <p>LOADING.....</p>
      )
    }
  }
}


function mapStateToProps(state) {
  return {
    tradeHistory: state.AggregatedOrderBook.tradeHistory.reverse(),
    fetched: state.AggregatedOrderBook.fetched,
    fetching: state.AggregatedOrderBook.fetching
  };
}

const mapDispatchToProps = (dispatch) => {
}

export default connect(mapStateToProps, mapDispatchToProps)(AggregatedOrderBook);
// export default AggregatedOrderBook;