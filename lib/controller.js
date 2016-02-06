var express = require('express');
var app = express();
var juiceCount = require('./readData.js');

app.use(express.static('./public'));
var Controller = function () {
    juiceCount();
    return function(req, res){
        console.log(req.url)
        app(req,res);
    }
}

module.exports = Controller;
