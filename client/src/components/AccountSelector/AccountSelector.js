import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from "axios";
import thunk from "redux-thunk";
// import { getOrderBookStart, getOrderBookReceived, getOrderBookError } from './actions';
// import DataTable from '../DataTable/DataTable';



export class AccountSelector extends Component {

  constructor(props) {
    super(props);

  }

  render() {
      return(
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Change Account
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Account 1</a>
          <a class="dropdown-item" href="#">Account 2</a>
          <a class="dropdown-item" href="#">Account 3</a>
        </div>
      </div>
      )

  }
}


function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);
// export default AggregatedOrderBook;