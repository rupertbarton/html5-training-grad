import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import thunk from "redux-thunk";
import DataTable from '../DataTable/DataTableFromArrayOfObjects';


export class AccountOrderBook extends Component {

  render() {
    if(this.props.AccountOrderBook==0){
      return(
<p> No Account Trades Found</p >
        )
      }
    else if(this.props.fetched) {
      return (
        <div className="AccountOrderBook">
          <DataTable headings={["Price", "Quantity"]} rows={this.props.AccountOrderBook} />
        </div>
      );
    }
  }
}



function mapStateToProps(state) {
  return {
    AccountOrderBook: state.AccountSelector.AccountOrderBook,
    fetched: state.AccountSelector.fetched
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountOrderBook);