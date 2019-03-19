// src = "http://yournodeserver/socket.io/socket.io.js"
const Matcher = require("./app/matcher");
const Order = require("./app/order");

var appRouter = function (app, io) {

  const mainMatcher = new Matcher()

  // let s2 = new Order("f", 21, 3, "sell")
  // let s3 = new Order("e", 19, 5, "sell")
  // let s1 = new Order("e", 17, 5, "sell")
  // let s4 = new Order("f", 15, 7, "sell")
  // let s5 = new Order("e", 13, 9, "sell")
  // let s6 = new Order("f", 11.1, 11, "sell")

  // let b1 = new Order("e", 1, 5, "buy")
  // let b2 = new Order("f", 3, 3, "buy")
  // let b3 = new Order("e", 5, 5, "buy")
  // let b4 = new Order("f", 7, 7, "buy")
  // let b5 = new Order("e", 9, 9, "buy")
  // let b6 = new Order("f", 11, 11, "buy")
  // mainMatcher.matcher(s1)
  // mainMatcher.matcher(s2)
  // mainMatcher.matcher(s3)
  // mainMatcher.matcher(s4)
  // mainMatcher.matcher(s5)
  // mainMatcher.matcher(s6)
  // mainMatcher.matcher(b1)
  // mainMatcher.matcher(b2)
  // mainMatcher.matcher(b3)
  // mainMatcher.matcher(b4)
  // mainMatcher.matcher(b5)
  // mainMatcher.matcher(b6)


  app.get("/", function (req, res) {       //Load all orders and trade history
    aggregate = Number(req.query.aggregate) || 0.01;
    res.status(200).send([mainMatcher.orderBook.createAgreggatedOrderBook(0.01), mainMatcher.tradeHistory, mainMatcher.orderBook.createD3Data()]);
  });

  app.get("/accountOrders", function (req, res) {      //Load account info
    let name = req.query.account;
    res.status(200).send(mainMatcher.orderBook.getAccountOrders(name));
  });

  app.post("/newOrder", function (req, res) {      //add new order
    name = req.body.account;
    quantity = Number(req.body.quantity);
    price = Number(req.body.price);
    action = req.body.action;
    aggregate = Number(req.body.aggregate) || 0.01;

    newOrder = new Order(name, price, quantity, action);
    mainMatcher.matcher(newOrder);
    mainMatcher.orderBook.createAgreggatedOrderBook(aggregate)
    res.status(201).send([mainMatcher.orderBook.getAggregatedOrderBook(), mainMatcher.tradeHistory, mainMatcher.orderBook.createD3Data(), mainMatcher.orderBook.getAccountOrders(name)]);
    io.emit("newOrderMade", [mainMatcher.orderBook.getAggregatedOrderBook(), mainMatcher.tradeHistory, mainMatcher.orderBook.createD3Data()]);
  });

  io.on('connection', function (socket) {
    socket.emit('connectionComplete', { hello: 'world' });
    console.log("Connection made to" + socket.id)
    socket.on("requestUpdateAccountOrders", function (accountId) {
      socket.emit('accountOrdersSent', mainMatcher.orderBook.getAccountOrders(accountId))
    });
  })
}

module.exports = appRouter;