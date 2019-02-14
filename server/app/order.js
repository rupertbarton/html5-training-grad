function Order(account, price, quantity, action) {
    this.account = account;
    this.price = price;
    this.quantity = quantity;
    this.action = action;
  }

  module.exports = Order;