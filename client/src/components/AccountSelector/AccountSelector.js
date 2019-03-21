import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeAccount, getOrderBookStart, getOrderBookReceived, getOrderBookError } from './actions';
// import DataTable from '../DataTable/DataTable';
import axios from "axios";
import serverAddress from '../../KeyFiles/serverAddress.js';



class AccountSelector extends Component {

  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Change Account
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownList" >
          {this.props.accounts.map(account => (
            <a className="dropdown-item" href="#" ref={ this.value = {account} } onClick={ () => this.handleChange(account)}>{account}</a>
          ))}
        </div>
      </div>
    )
  }

  handleChange(value){
    this.props.getOrders(value)
    this.props.changeAccount(value)
  }
}


function mapStateToProps(state) {
  return {
    accounts: state.Accounts.accounts,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAccount: (value) => {dispatch(changeAccount(value))},
    
    getOrders: (currentAccount) => {
      dispatch(getOrderBookStart())
      axios.get(serverAddress + "accountOrders?account=" + currentAccount).then(
        (response) => {
          dispatch(getOrderBookReceived(response.data))
        }
      ).catch((err) => { getOrderBookError() }
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);