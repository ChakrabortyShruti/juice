var scale = d3.scale.linear()
                .domain([0,6000])
                .range([0,700]);

d3.json('/data.json',function(err,json){
    var data = json;
    var holder = d3.select("body")
                    .append("svg")
                    .attr("width", 1500)
                    .attr('height', 850)
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

    var bar = lineGroup
                    .append("line")
                    .attr("x1", function(d, index){return (index*50)+20;})
                    .attr("x2", function(d, index){return (index*50)+20;})
                    .attr("y1", 750)
                    .attr("y2", function(d){return 700 - scale(d.count)})
                    .style("stroke","steelblue")
                    .style("stroke-width",20);

    lineGroup.append("title")
            .text(function(d){return d.count;});

    var textGroup = lineGroup.append('g');

    textGroup.append("text")
            .text(function(d){return d.name;})
            .attr("x",function(d, i){return (i*50)+10;})
            .attr("y", 780)
            .style("writing-mode","tb");
}
