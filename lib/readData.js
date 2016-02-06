var fs = require('fs');
var juiceCounts = function(){
    var juiceData = fs.readFileSync('./data/juice_orders');
    juiceData = JSON.parse(juiceData);

    var drinks = {};
    for(var index=0;index<juiceData.length;index++){
        var drinkName = juiceData[index].drinkName.toLowerCase();
        if(!drinks[drinkName]){
            drinks[drinkName] = 0;
        }
        drinks[drinkName]++;
    }
    delete drinks['register user'];
    drinks = convertToArray(drinks);
    fs.writeFileSync('public/data.json',JSON.stringify(drinks));
};

var convertToArray  =function(obj){
    var resultantObject=[];
    for (juiceName in obj){
        resultantObject.push({name:juiceName,count:obj[juiceName]});
    }
    return resultantObject;
};
module.exports = juiceCounts;
