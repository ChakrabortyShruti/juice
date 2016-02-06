var http = require('http');
var Controller = require('./lib/controller.js');
var controller = Controller();

http.createServer(controller).listen(1234);
