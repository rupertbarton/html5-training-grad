import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

export class AccountAdder extends Component {

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.handleAdd = this.handleAdd.bind(this);
  }
  
  render() {
    return(
      <div>
        <input ref={ this.inputRef } />
        <button type="button" onClick={ () => {this.handleAdd()}}>Add Account</button>
        </div>
      )
      
    }
    
    handleAdd(){
      this.props.addAccount(this.inputRef.current.value);
    }
    
}

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAccount: value => dispatch(actions.addAccount(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountAdder);