import * as d3 from 'd3';
let d3tip = require('d3-tip')(d3);

export const createSidewaysGraph = function(dataList, svgDOM) {
  let height = 110//window.innerHeight;
  let width = 180//window.innerWidth;

  let svg = d3.select(svgDOM);
  svg.selectAll("*").remove();
  svg.attr("width", width);
  svg.attr("height", height);

  let x = d3.scaleBand().rangeRound([0, width]),
      y = d3.scaleBand().rangeRound([height, 0]),
      axisMargin = 20,
      valueMargin = 4,
      barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
      barPadding = (height-axisMargin-margin*2)*0.6/data.length,
      data = dataList,
      bar, scale, xAxis, labelWidth = 0;

  max = d3.max(data, function(d) { return d.value; });

  bar = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g");

   bar.attr("class", "bar")
      .attr("cx",0)
      .attr("transform", function(d, i) {
         return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
      });

   bar.append("text")
            .attr("class", "label")
            .attr("y", barHeight)
            .attr("dy", ".35em") //vertical align middle
            .text(function(d){
                return d.label;
            }).each(function() {
        labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
    });

    scale = d3.scale.linear()
            .domain([0, max])
            .range([0, width - margin*2 - labelWidth]);

    xAxis = d3.svg.axis()
            .scale(scale)
            .tickSize(-height + 2*margin + axisMargin)
            .orient("bottom");

    bar.append("rect")
            .attr("transform", "translate("+labelWidth+", 0)")
            .attr("height", barHeight)
            .attr("width", function(d){
                return scale(d.value);
            });

}