const Order = require("../app/order");

function OrderBook(buy = [], sell = []) {
  this.buy = buy;
  this.sell = sell;
  this.buyAggregatedOrderBook = [];
  this.sellAggregatedOrderBook = [];
  this.aggregatedOrderBook = [];
  
  
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
    this.buyAggregatedOrderBook = [];
    this.sellAggregatedOrderBook = [];
    this.aggregatedOrderBook = [];
    let currentRangeStart = 0

    for (i = 0; i < buy.length; i++) {

      if (buy[i].price >= (currentRangeStart) && this.buyAggregatedOrderBook.length > 0) {
        this.buyAggregatedOrderBook[this.buyAggregatedOrderBook.length - 1][1] += buy[i].quantity
      }
      else {
        currentRangeStart = Math.floor((buy[i].price + 0.001) / aggregation) * aggregation;
        this.buyAggregatedOrderBook.push([Number(currentRangeStart.toFixed(2)), buy[i].quantity])
      }
    }

    currentRangeStart = 0
    for (i = 0; i < sell.length; i++) {

      if (sell[i].price <= (currentRangeStart) && this.sellAggregatedOrderBook.length > 0) {
        this.sellAggregatedOrderBook[this.sellAggregatedOrderBook.length - 1][1] += sell[i].quantity
      }
      else {
        currentRangeStart = Math.ceil(sell[i].price / aggregation) * aggregation;
        this.sellAggregatedOrderBook.push([Number(currentRangeStart.toFixed(2)), sell[i].quantity])
      }
    }

    this.aggregatedOrderBook = [this.buyAggregatedOrderBook, this.sellAggregatedOrderBook]
    return this.aggregatedOrderBook
  }

  this.getAggregatedOrderBook = function () {
    return this.aggregatedOrderBook;
  }

  this.createD3Data = function () {
    let cumulativeQuantity = 0
    let buys = []
    let sells = []
    for (i = 0; i < this.buyAggregatedOrderBook.length; i++) {
      cumulativeQuantity += this.buyAggregatedOrderBook[i][1]
      buys.push({
        price:this.buyAggregatedOrderBook[i][0],
        quantity:cumulativeQuantity
      })
    }
    console.log("yoohoo")
    cumulativeQuantity = 0
    console.log(this.sellAggregatedOrderBook)
    for (i = this.sellAggregatedOrderBook.length-1; i > -1; i--) {
      cumulativeQuantity += this.sellAggregatedOrderBook[i][1]
      sells.push({
        price:this.sellAggregatedOrderBook[i][1],
        quantity:cumulativeQuantity
      })
  }
  return([buys])
}
}
module.exports = OrderBook;