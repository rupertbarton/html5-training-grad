const Matcher = require("../app/matcher");
const Order = require("../app/order");
var appRouter = function (app) {

  const mainMatcher = new Matcher()

  let c = new Order("a",5,5,"sell")
  let d = new Order("a",1000,5,"sell")
  
  let e = new Order("a",4.5,5,"buy")
  let f = new Order("a",1,5,"buy")
  mainMatcher.matcher(c)
  mainMatcher.matcher(c)
  mainMatcher.matcher(c)
  mainMatcher.matcher(d)
  mainMatcher.matcher(d)
  mainMatcher.matcher(e)
  mainMatcher.matcher(e)
  mainMatcher.matcher(f)


    app.get("/", function (req, res) {       //Load all orders and trade history
    aggregate = Number(req.query.aggregate) || 0.01;
    res.status(200).send([mainMatcher.orderBook.createAgreggatedOrderBook(0.01), mainMatcher.tradeHistory]);
  });

  app.get("/accountOrders", function (req, res) {      //Load account info
    let name = req.query.account;
    console.log(mainMatcher.orderBook.getAccountOrders(name))
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
    res.status(201).send([mainMatcher.orderBook.createAgreggatedOrderBook(aggregate), mainMatcher.tradeHistory, mainMatcher.orderBook.getAccountOrders(name),]);
  });
}

module.exports = appRouter;