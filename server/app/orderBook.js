const Order = require("../app/order");

function OrderBook(buy = [], sell = []) {
    this.buy = buy;
    this.sell = sell

    //Returns a full array of all orders belonging to an account
    this.getAccountOrders = function  (accountName){
      console.log(this.buy)
      accountOrders = []
      for (i = 0; i < this.buy.length; i++){
        if (this.buy[i].account === accountName){
          accountOrders.push(this.buy[i])
        }
      }

      for (i = 0; i < this.sell.length; i++){
        if (this.sell[i].account === accountName){
          accountOrders.push(this.sell[i])
        }
      }
      return accountOrders
    }

}
  module.exports = OrderBook;