var fs = require('fs');

var getHour = function(date){
    var time = new Date(date);
    return time.getHours();
}

var storeTimeRecord = function(){
    var juiceData = fs.readFileSync('./data/juice_orders');
    juiceData = JSON.parse(juiceData);
    var drinkTime = {};
    for(var index=0;index<juiceData.length;index++){
        var drink = juiceData[index];
        var hour = getHour(drink.date);
        if(!drinkTime[hour])
            drinkTime[hour] = 0;
        drinkTime[hour]++;
    }
    var timeCount = convertToArray(drinkTime);
    fs.writeFileSync('public/time.json',JSON.stringify(timeCount));
};

var convertToArray  =function(juiceRecord){
    var resultantObject=[];
    for (time in juiceRecord){
        resultantObject.push({time:+time,count:juiceRecord[time]});
    }
    return resultantObject;
};

module.exports = storeTimeRecord;
