var fs = require('fs');
var juiceCounts = function(){
    var juiceData = fs.readFileSync('./data/juice_orders');
    juiceData = JSON.parse(juiceData);

    var drinks = {};
    for(var index=0;index<juiceData.length;index++){
        var drink = juiceData[index];
        var drinkName = drink.drinkName.toLowerCase();
        if(!drinks[drinkName]){
            drinks[drinkName] = {total_count: 0, sugarless: 0, swipe: 0};
        }
        drinks[drinkName].total_count++;
        drink.isSwipe && drinks[drinkName].swipe++;
        drink.isSugarless && drinks[drinkName].sugarless++;
    }
    delete drinks['register user'];
    delete drinks['ctl'];
    drinks = convertToArray(drinks);
    fs.writeFileSync('public/data.json',JSON.stringify(drinks));
};

var convertToArray  =function(juiceData){
    var resultantObject=[];
    for (juiceName in juiceData){
        var juice = juiceData[juiceName];
        var entity = {
            name : juiceName,
            total_count : juice.total_count,
            sugarless : juice.sugarless,
            swipe : juice.swipe
        }
        resultantObject.push(entity);
    }
    return resultantObject;
};
module.exports = juiceCounts;
