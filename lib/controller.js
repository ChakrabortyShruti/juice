var express = require('express');
var app = express();
var juiceCount = require('./readData.js');
var storeTimeRecord = require('./readTime.js');

app.use(express.static('./public'));
var Controller = function () {
    juiceCount();
    storeTimeRecord();
    return function(req, res){
        console.log(req.url)
        app(req,res);
    }
}

module.exports = Controller;
