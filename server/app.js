var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes.js");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


server.listen(3001, function () {
  console.log("app running on port", server.address().port);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

routes(app, io);


io.on('connection', function (socket) {
  console.log("made connection")
  socket.emit('connectionComplete', { hello: 'world' });
})