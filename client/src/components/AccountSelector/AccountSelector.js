import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeAccount, getOrderBookStart, getOrderBookReceived, getOrderBookError, loginStart, loginSuccess, loginError } from './actions';
// import DataTable from '../DataTable/DataTable';
import axios from "axios";
import serverAddress from '../../KeyFiles/serverAddress.js';

class AccountSelector extends Component {

  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();

  }

  componentDidMount(){
if (localStorage.getItem("jwt")){
  this.props.getOrders()
}
  }

  render() {
    return (
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Change Account
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownList" >
          {this.props.accounts.map(account => (
            <a class="dropdown-item" href="#" ref={this.value = { account }} onClick={() => this.handleChange(account)}>{account}</a>
          ))}
        </div>

        <form>
          <h2>Login</h2>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="username" ref={this.usernameRef} class="form-control" id="username" aria-describedby="username" placeholder="Username" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" ref={this.passwordRef} class="form-control" id="password" placeholder="Password" />
          </div>
          <br />
          <br />
          <button type="button" class="btn btn-primary btn-lg" onClick={() => this.handleLogin()}>Submit</button>
        </form>
      </div>
    )
  }

  handleChange(value) {
    this.props.getOrders(value)
    this.props.changeAccount(value)
  }

  handleLogin() {
    this.props.login({
      userName: this.usernameRef.current.value,
      password: this.passwordRef.current.value
    })
  }


}


function mapStateToProps(state) {
  return {
    accounts: state.Accounts.accounts
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAccount: (value) => { dispatch(changeAccount(value)) },
    getOrders: () => {
      dispatch(getOrderBookStart())
      axios.get(serverAddress + "accountOrders", {'headers': { token: sessionStorage.getItem("jwt")}}).then(
        (response) => {
          dispatch(getOrderBookReceived(response.data))
        }
      ).catch((err) => { getOrderBookError() }
      )
    },

    login: (newLogin) => {
      dispatch(loginStart())

      axios({
        method: "post",
        url: serverAddress + "login",
        data: newLogin
      }).then(
        (response) => {
          dispatch(loginSuccess(response.data))
        }
      ).catch((err) => {
        alert(err.response.data)
        loginError(err)
      }
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);