const Matcher = require("../app/matcher");
const Order = require("../app/order");
var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });

  abc = new Matcher()

  app.post("/test", function(req, res) {
    name = req.body.account
    quantity = req.body.quantity
    price = req.body.price
    action = req.body.action
    testOrder = new Order(name,price,quantity,action)
    abc.matcher(testOrder)
    res.status(200).send(abc.orderBook);
  });
}

module.exports = appRouter;