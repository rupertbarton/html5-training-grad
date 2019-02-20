const Order = require("../app/order");

function OrderBook(buy = [], sell = []) {
  this.buy = buy;
  this.sell = sell;
  // let buyAggregatedOrderBook = [];
  // let sellAggregatedOrderBook = [];
  // let aggregatedOrderBook = [];

  //Returns a full array of all orders belonging to an account
  this.getAccountOrders = function (accountName) {
    accountOrders = []
    for (i = 0; i < this.buy.length; i++) {
      if (this.buy[i].account === accountName) {
        accountOrders.push(this.buy[i])
      }
    }

    for (i = 0; i < this.sell.length; i++) {
      if (this.sell[i].account === accountName) {
        accountOrders.push(this.sell[i])
      }
    }
    return accountOrders;
  }

  this.createAgreggatedOrderBook = function (aggregation) {
  let buyAggregatedOrderBook = [];
    let sellAggregatedOrderBook = [];
    let aggregatedOrderBook = [];
    let currentRangeStart = 0
    for (i = 0; i < buy.length; i++) {

        if(buy[i].price >= (currentRangeStart) && buyAggregatedOrderBook.length > 0){
          buyAggregatedOrderBook[buyAggregatedOrderBook.length - 1][1] += buy[i].quantity
        }
        else{
          currentRangeStart = Math.floor(buy[i].price / aggregation) * aggregation;
          buyAggregatedOrderBook.push([currentRangeStart, buy[i].quantity])
        }     
      }

      currentRangeStart = 0
      for (i = 0; i < sell.length; i++) {


          if(sell[i].price <= (currentRangeStart) && sellAggregatedOrderBook.length > 0){
            sellAggregatedOrderBook[sellAggregatedOrderBook.length - 1][1] += sell[i].quantity
          }
          else{
            currentRangeStart = Math.ceil(sell[i].price / aggregation) * aggregation;
            sellAggregatedOrderBook.push([currentRangeStart, sell[i].quantity])
          }        
        }

        aggregatedOrderBook = [buyAggregatedOrderBook, sellAggregatedOrderBook]
        return aggregatedOrderBook
      }

  this.getAggregatedOrderBook = function () {
    return aggregatedOrderBook;
  }

}
module.exports = OrderBook;