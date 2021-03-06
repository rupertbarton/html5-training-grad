import React, { Component } from 'react';
import { connect } from 'react-redux';
import {sendNewOrderStart,sendNewOrderError,newOrderSent} from './actions';
import { getOrderBookStart, getOrderBookReceived} from '../AggregatedOrderBook/actions';
import { getOrderBookStart as accountStart, getOrderBookReceived as accountRecieved,} from '../AccountSelector/actions';
import serverAddress from '../../KeyFiles/serverAddress.js';



import axios from "axios";

class NewOrderForm extends Component {

  constructor(props) {
    super(props);
    this.actionType = ""
    this.activeButton = "btn btn-primary btn-lg"
    this.inactiveButton = "btn btn-secondary btn"
    this.buyButton = this.inactiveButton
    this.sellButton = this.inactiveButton

    this.priceRef = React.createRef();
    this.quantityRef = React.createRef();
    this.handleNewOrder = this.handleNewOrder.bind(this);
  }

  // componentDidMount(){
  //   let i = 0;

  //   while (i<1000){
  //     this.props.newOrder(
  //       {
  //         account: "a",
  //         quantity: Math.random()*10,
  //         price: Math.random()*10,
  //         action: "buy"
  //       }
  //     )

  //     this.props.newOrder(
  //       {
  //         account: "a",
  //         quantity: Math.random()*1000,
  //         price: Math.random()*1000,
  //         action: "sell"
  //       }
  //     )
  //     i++
  //   }
  // }

  render() {
    return (
      <div>
        <form>
          <h2>New Order Form</h2>
          <div className="form-group">
            <label >Quantity</label>
            <input type="number" ref={this.quantityRef} className="form-control" id="quantity" aria-describedby="quantity" placeholder="Enter Quantity" />
          </div>
          <div className="form-group">
            <label >Price</label>
            <input type="number" ref={this.priceRef} className="form-control" id="price" placeholder="Enter Price" />
          </div>
          <button type="button" className={this.buyButton} onClick={() => this.handleActionTypeChange("buy")}>Buy</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" className={this.sellButton} onClick={() => this.handleActionTypeChange("sell")}>Sell</button>
          <br />
          <br />
          <button type="button" className="btn btn-primary btn-lg" onClick={() => this.handleNewOrder()}>Submit</button>
        </form>
      </div>
    )
  }

  handleNewOrder() {
    console.log(serverAddress + "newOrder");
    this.props.newOrder(
      {
        account: this.props.account,
        quantity: this.quantityRef.current.value,
        price: this.priceRef.current.value,
        action: this.actionType
      }
    )
  }

  handleActionTypeChange(action) {
    this.actionType = action
    if (action === "buy"){
      this.buyButton = this.activeButton
      this.sellButton = this.inactiveButton
    }
    else{
      this.buyButton = this.inactiveButton
      this.sellButton = this.activeButton
    }
    this.forceUpdate()
  }

}

const mapStateToProps = state => ({
   account: state.AccountSelector.currentAccount,
  });

const mapDispatchToProps = (dispatch) => {
  return {
    newOrder: (newOrder) => {
      dispatch(sendNewOrderStart())
      dispatch(accountStart())
      dispatch(getOrderBookStart())
      axios({
        method: "post",
        url: serverAddress + "newOrder",
      data: newOrder
      }).then(
        (response) => {
          console.log(response.data.status)
          dispatch(newOrderSent())
          dispatch(getOrderBookReceived(response.data.slice(0,3)))
          dispatch(accountRecieved(response.data[3]))
        }
      ).catch((err) => { 
        alert(err.response.data.errors[0].defaultMessage)        
        sendNewOrderError() }
      )
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(NewOrderForm);
