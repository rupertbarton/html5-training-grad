const Matcher = require("../app/matcher");
const Order = require("../app/order");
var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });

  abc = new Matcher()

  app.get("/test", function(req, res) {
    name = req.query.name
    quantity = req.query.quantity
    price = req.query.price
    action = req.query.action
    testOrder = new Order(name,price,quantity,action)
    abc.matcher(testOrder)
    res.status(200).send(abc.orderBook);
  });
}

module.exports = appRouter;