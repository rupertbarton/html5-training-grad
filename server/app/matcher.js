"use strict"
const Order = require("../app/order");
const OrderBook = require("../app/orderBook");



function Matcher(orderBook = new OrderBook()) {

    this.orderBook = orderBook;
    this.buyOrders = orderBook.buy;
    this.sellOrders = orderBook.sell;
    currentId = 0

    this.matcher = function (newOrder) {

        if (newOrder.action === "sell") {
            for (let i = 0; i< this.buyOrders.length; i++) {

                if (newOrder.price <= this.buyOrders[i].price) {

                    if (newOrder.quantity > this.buyOrders[i].quantity) {     //New order has a larger quantity
                        newOrder.quantity -= this.buyOrders[i].quantity;
                        this.buyOrders.splice(this.buyOrders.indexOf(this.buyOrders[i]), 1)
                        i-=1;
                    }
                    else if (newOrder.quantity < this.buyOrders[i].quantity) {     //New order has less quantity
                        this.buyOrders[i].quantity -= newOrder.quantity;
                        return
                    }
                    else if (newOrder.quantity === this.buyOrders[i].quantity) {     //New order has same quantity
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
                        newOrder.quantity -= this.sellOrders[i].quantity;
                        this.sellOrders.splice(this.sellOrders.indexOf(this.sellOrders[i]), 1);
                        i-=1;
                    }
                    else if (newOrder.quantity < this.sellOrders[i].quantity) {     //New order has less quantity
                        this.sellOrders[i].quantity -= newOrder.quantity;
                        return
                    }
                    else if (newOrder.quantity === this.sellOrders[i].quantity) {     //New order has same quantity
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

    this.matcherMultiple = function (newOrders) {
        for (i in newOrders) {
            this.matcher(newOrders[i]);
        }
    }

}

// let abc = new Matcher()

// let a = new Order("a",10,4,"sell")
// let b = new Order("b",1,4,"buy")
// abc.matcher(a);
// abc.matcher(b)

// console.log (abc)

module.exports = Matcher;