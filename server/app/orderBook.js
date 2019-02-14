const Order = require("../app/order");

function OrderBook(buy = [], sell = []) {
    this.buy = buy;
    this.sell = sell

}
  module.exports = OrderBook;