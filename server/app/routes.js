const Matcher = require("../app/matcher");
const Order = require("../app/order");
var appRouter = function (app) {

    mainMatcher = new Matcher();

  app.post("/newOrder", function(req, res) {      //add new order
    name = req.body.account
    quantity = Number(req.body.quantity)
    price = Number(req.body.price)
    action = req.body.action
    newOrder = new Order(name,price,quantity,action)
    mainMatcher.matcher(newOrder)
    res.status(200).send([mainMatcher.orderBook.createAgreggatedOrderBook(1) , mainMatcher.orderBook.getAccountOrders(name) , mainMatcher.tradeHistory]);
  });

  app.get("/", function(req, res) {       //Load all orders and trade history
    res.status(200).send([mainMatcher.orderBook.createAgreggatedOrderBook(1) , mainMatcher.tradeHistory]);
  });

  app.get("/accountOrders", function(req, res) {      //Load account info
    let name = req.query.account
    res.status(200).send(mainMatcher.orderBook.getAccountOrders(name));
  });
}

module.exports = appRouter;