import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

class AccountAdder extends Component {

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.handleAdd = this.handleAdd.bind(this);
    console.log(this.inputRef)
  }
  
  render() {
    console.log(this.inputRef)
    return(
      <div>
        <input ref={ this.inputRef } />
        <button type="button" onClick={ () => this.handleAdd()}>Add Account</button>
        </div>
      )  
    }
    
    handleAdd(){
      console.log(this.inputRef)
      if (this.inputRef.current.value == ""){
        return (alert("Account field Empty"))
      }
      else if(this.props.accounts.indexOf(this.inputRef.current.value) > -1){
        return (alert("Account name already taken"))
      }
      this.props.addAccount(this.inputRef.current.value);
    }
    
}

const mapStateToProps = state => ({    accounts: state.Accounts.accounts});

const mapDispatchToProps = dispatch => ({
  addAccount: data => dispatch(actions.addAccount(data)) 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountAdder);
