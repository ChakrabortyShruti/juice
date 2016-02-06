var express = require('express');
var app = express();
var juiceData = require('./readData.js');

app.use(express.static('./public'));
var Controller = function () {
    return function(req, res){
        console.log(req.url)
        app(req,res);
    }
}

module.exports = Controller;
