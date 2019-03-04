import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeAccount} from './actions';
// import DataTable from '../DataTable/DataTable';

class AccountSelector extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Change Account
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownList" >
          {this.props.accounts.map(account => (
            <a class="dropdown-item" href="#" ref={ this.value = {account} } onClick={ () => this.handleAdd()}>{account}</a>
          ))}
        </div>
      </div>
    )
  }

  handleAdd(value){
    console.log(this.value.account)
  this.props.changeAccount(this.value.account)
  }
}


function mapStateToProps(state) {
  return {
    accounts: state.Accounts.accounts
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAccount: (value) => {dispatch(changeAccount(value))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);