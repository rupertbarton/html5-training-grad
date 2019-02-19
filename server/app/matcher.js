"use strict"
const Order = require("../app/order");
const OrderBook = require("../app/orderBook");
const Trade = require("../app/trade");



function Matcher(orderBook = new OrderBook(), tradeHistory = []) {

    this.orderBook = orderBook;

    this.buyOrders = orderBook.buy;
    this.sellOrders = orderBook.sell;
    this.tradeHistory = tradeHistory;


    //Run the matcher for an order, and sorts the result by price and then by age
    this.matcher = function (newOrder) {

        if (newOrder.action === "sell") {
            for (let i = 0; i< this.buyOrders.length; i++) {

                if (newOrder.price <= this.buyOrders[i].price) {
                    if (newOrder.quantity > this.buyOrders[i].quantity) {     //New order has a larger quantity
                        tradeHistory.push(new Trade(this.buyOrders[i].price, this.buyOrders[i].quantity))
                        newOrder.quantity -= this.buyOrders[i].quantity;
                        this.buyOrders.splice(this.buyOrders.indexOf(this.buyOrders[i]), 1)
                        i-=1;git
                    }
                    else if (newOrder.quantity < this.buyOrders[i].quantity) {     //New order has less quantity
                        tradeHistory.push(new Trade(this.buyOrders[i].price, newOrder.quantity))
                        this.buyOrders[i].quantity -= newOrder.quantity;
                        return
                    }
                    else if (newOrder.quantity === this.buyOrders[i].quantity) {     //New order has same quantity
                        tradeHistory.push(new Trade(this.buyOrders[i].price, newOrder.quantity))
                        this.buyOrders.splice(this.buyOrders.indexOf(this.buyOrders[i]), 1)
                        return
                    }
                }
                else {
                    break
                }

            }

            if (this.sellOrders.length == 0) {
                this.sellOrders.push(newOrder);

            }
            else {
                for (let i in this.sellOrders) {
                    if (this.sellOrders[i].price > newOrder.price) {
                        this.sellOrders.splice(i, 0, newOrder);
                        break
                    }

                    if (i == this.sellOrders.length - 1) {
                        this.sellOrders.push(newOrder)
                    }
                }
            }                   //TODO Save trades and record the price of trade
            return
        }


        else if (newOrder.action === "buy") {
            for (let i = 0; i< this.sellOrders.length; i++) {
                if (newOrder.price >= this.sellOrders[i].price) {
                    if (newOrder.quantity > this.sellOrders[i].quantity) {     //New order has a larger quantity
                        tradeHistory.push(new Trade(this.sellOrders[i].price, this.sellOrders[i].quantity))
                        newOrder.quantity -= this.sellOrders[i].quantity;
                        this.sellOrders.splice(this.sellOrders.indexOf(this.sellOrders[i]), 1);
                        i-=1;
                    }
                    else if (newOrder.quantity < this.sellOrders[i].quantity) {     //New order has less quantity
                        tradeHistory.push(new Trade(this.sellOrders[i].price, newOrder.quantity))
                        this.sellOrders[i].quantity -= newOrder.quantity;
                        return
                    }
                    else if (newOrder.quantity === this.sellOrders[i].quantity) {     //New order has same quantity
                        tradeHistory.push(new Trade(this.sellOrders[i].price, newOrder.quantity))
                        this.sellOrders.splice(this.sellOrders.indexOf(this.sellOrders[i]), 1);
                        return
                    }
                }

                else {
                    break
                }

            }

            if (this.buyOrders.length == 0) {
                this.buyOrders.push(newOrder);
            }
            else {
                for (let i in this.buyOrders) {
                    if (this.buyOrders[i].price < newOrder.price) {
                        this.buyOrders.splice(i, 0, newOrder);
                        break
                    }

                    if (i == this.buyOrders.length - 1) {
                        this.buyOrders.push(newOrder)
                    }
                }
            }
        }
    }

    //Run the matcher for an array containing multiple orders
    this.matcherMultiple = function (newOrders) {
        for (i in newOrders) {
            this.matcher(newOrders[i]);
        }
    }

}

// let abc = new Matcher()

// let a = new Order("a",2,4,"sell")
// let b = new Order("a",6,4,"buy")
// let d = new Order("a",3,7,"buy")
// let c = new Order("a",1,5,"sell")
// abc.matcher(a);
// abc.matcher(b);
// abc.matcher(d);
// abc.matcher(c);

// console.log (abc.tradeHistory)

module.exports = Matcher;