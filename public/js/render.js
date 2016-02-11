var margin = {
    top: 30,
    right: 40,
    left: 40,
    bottom: 30
};
var width = 1200 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;
//
// var x = d3.scale.ordinal()
//     .rangeRoundBands([0, width], 0.1);
// var y = d3.scale.linear()
//     .range([height, 0]);
//
// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
var scale = d3.scale.linear()
                .domain([0,6000])
                .range([0,700]);

d3.json('/data.json',function(err,json){
    var data = json;
    var holder = d3.select(".canvas")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr('height', width + margin.top + margin.bottom)
    visualizeData(holder, data);
    holder.append("line")
        .attr({x1: 0, x2: 1500, y1: 750, y2: 750})
        .style({stroke: "black", "stroke-width": 1});
    holder.append("line")
        .attr({x1: 0, x2: 0, y1: 0, y2: 750})
        .style({stroke: "black", "stroke-width": 1});
});

var visualizeData = function(holder, data){
    var lineGroup = holder
                        .selectAll("g")
                        .data(data)
                        .enter()
                        .append("g");
                        // .call(yAxis);

    var bar = lineGroup
                    .append("line")
                    .attr("x1", function(d, index){return (index*50)+20;})
                    .attr("x2", function(d, index){return (index*50)+20;})
                    .attr("y1", 750)
                    .attr("y2", function(d){return 700 - scale(d.total_count)})
                    .style("stroke","steelblue")
                    .style("stroke-width",20);

    lineGroup.append("title")
            .text(function(d){return d.total_count;});

    var textGroup = lineGroup.append('g');

    textGroup.append("text")
            .text(function(d){return d.name;})
            .attr("x",function(d, i){return (i*50)+10;})
            .attr("y", 780)
            .style("writing-mode","tb");
}
