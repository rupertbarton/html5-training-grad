function Trade(price, quantity, date = new Date()) {
    this.price = price;
    this.quantity = quantity;
    this.date = date;
  }

  module.exports = Trade;