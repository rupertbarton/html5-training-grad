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
                    tradeHistory.push(new Trade(this.buyOrders[i].price, Math.min(this.buyOrders[i].quantity,newOrder.quantity)))
                    
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
                        break
                    }
                }
            }                   //TODO Save trades and record the price of trade
            return
        }


        else if (newOrder.action === "buy") {
            for (let i = 0; i< this.sellOrders.length; i++) {

                if (newOrder.price >= this.sellOrders[i].price) {
                    tradeHistory.push(new Trade(this.sellOrders[i].price, Math.min(this.sellOrders[i].quantity,newOrder.quantity)))

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
                        break
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

module.exports = Matcher;