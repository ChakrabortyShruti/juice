var fs = require('fs');
var juiceData = fs.readFileSync('../data/juice_orders');
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
module.exports = drinks;
