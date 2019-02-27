var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./app/routes.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  routes(app);


var server = app.listen(3001, function () {
    console.log("app running on port", server.address().port);
});