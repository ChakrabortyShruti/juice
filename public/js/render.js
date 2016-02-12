var margin = {
    top: 30,
    right: 40,
    left: 40,
    bottom: 30
};

var juiceData;
$.ajax({
    url:"/data.json",
    dataType:"json",
    async:false,
    success: function(data){
        juiceData=data;
    }
});

var width = 1200 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);
var y = d3.scale.linear()
    .range([height, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
var scale = d3.scale.linear()
                .domain([0,6000])
                .range([0,700]);
var juiceCount  =function(){
    $(".canvas").empty();
    var holder = d3.select(".canvas")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr('height', width + margin.top + margin.bottom);
    barGraph(holder, juiceData);
}

var barGraph = function(holder, data){
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

    holder.append("line")
        .attr({x1: 0, x2: 1500, y1: 750, y2: 750})
        .style({stroke: "black", "stroke-width": 1});
    holder.append("line")
        .attr({x1: 0, x2: 0, y1: 0, y2: 750})
        .style({stroke: "black", "stroke-width": 1});
}

var pieChart = function(data, name){
    var width = 250;
    var height = 250;
    var r = 75;
    var color = d3.scale.ordinal().range(["#ff490d","lightgreen"]);

    var canvas = d3.select('.canvas')
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    var chart = canvas
        .data([data])
        .append("g")
        .attr("transform", "translate(" + r + "," + r + ")");
    var pie = d3.layout.pie()
        .value(function(d){return d;});

    var arc = d3.svg.arc().outerRadius(r);

    var arcs = chart.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice");

    arcs.append("svg:path")
        .attr("fill", function(d, i){return color(i);})
        .attr("d", function (d) {
            return arc(d);
        });

    arcs.append("svg:text")
        .attr("transform", function(d){
    			d.innerRadius = 30;
    			d.outerRadius = 30;
                return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d){return d.value;});

    canvas.append('text')
        .text(name)
        .attr('y', 175)
        .attr('x', "35%")
        .attr('text-anchor', "middle")
        .attr('alignment-baseline', "middle")
        .attr('font-size', 20);

};

var sugarCount = function(){
    $(".canvas").empty();
    juiceData.forEach(function(juice, index){
        var withSugar = juice.total_count - juice.sugarless;
        pieChart([withSugar, juice.sugarless], juice.name);
    });
};

var swipeCount = function(){
    $(".canvas").empty();
    juiceData.forEach(function(juice, index){
        var notswiped = juice.total_count - juice.swipe;
        pieChart([notswiped, juice.swipe], juice.name)
    });
};

var timeCount = function(){
    $('.canvas').empty();
    d3.json('./time.json',function(err,data){
        var holder = d3.select(".canvas")
            .append("svg")
            .attr("width",width)
            .attr("height",height+100);

        var xScale = d3.scale.linear()
            .range([margin.left,width-margin.right])
            .domain([7,21]);

        var yScale = d3.scale.linear()
            .range([height-margin.top,margin.bottom])
            .domain([0,7000]);

        var xAxis = d3.svg.axis().scale(xScale);
        var yAxis = d3.svg.axis().scale(yScale).orient("left");

        holder.append('svg:g')
            .attr("class","axis")
            .attr("transform","translate(10,"+(height-margin.bottom)+")")
            .call(xAxis)
            .attr("stroke-width",1);

        holder.append('svg:g')
            .attr("class","axis")
            .attr("transform","translate("+(margin.left+10)+",0)")
            .call(yAxis);

        var lineGenerator = d3.svg.line()
            .x(function(d){
                return xScale(d.time)+10;
            })
            .y(function(d){
                return yScale(d.count);
            });

        holder.append('svg:path')
            .attr('d',lineGenerator(data))
            .attr('stroke','green')
            .attr('stroke-width',2)
            .attr('fill','none');
    });
};

var render = function(){
    $('#juiceCount').click(juiceCount);
    $('#sugarCount').click(sugarCount);
    $('#swipeCount').click(swipeCount);
    $('#timeCount').click(timeCount);
};

$(document).ready(render);
