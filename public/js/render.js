var scale = d3.scale.linear()
                .domain([0,6000])
                .range([0,700]);

d3.json('/data.json',function(err,json){
    var data = json;
    var holder = d3.select("body")
                    .append("svg")
                    .attr("width", 1000)
                    .attr('height', 750);
    visualizeData(holder, data);
});

var visualizeData = function(holder, data){
    var rectGroup = holder
                        .selectAll("g")
                        .data(data)
                        .enter()
                        .append("g")

    var rect = rectGroup
                    .append("rect")
                    .attr("x", 10)
                    .attr("y", function(d, index){return index*25;})
                    .attr("width", function(d){return scale(d.count)})
                    .attr("height", 20)
                    .style("fill", function(d, index){return index%2 == 0 ? "steelblue" : "skyblue"})
                    .style("stroke",function(d, index){return index%2 == 0 ? "skyblue" : "steelblue"})

    var text = rectGroup
                    .append("text");
                    .text(function(d){return d.name;})
                    .attr("x",function(d){return scale(d.count)+20})
                    .attr("y",function(d,index){return (25*index)+15;});
}
