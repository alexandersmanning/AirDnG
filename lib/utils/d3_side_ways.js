import * as d3 from 'd3';
let d3tip = require('d3-tip')(d3);

export const createSidewaysGraph = function(dataList, svgDOM) {
  let height = 110//window.innerHeight;
  let width = 180//window.innerWidth;

  let svg = d3.select(svgDOM);
  svg.selectAll("*").remove();
  svg.attr("width", width);
  svg.attr("height", height);

  let total = ["entire_house", "private_room", "shared_room"].reduce( (sum, el)=> {
    return sum + dataList[el].num_available
  }, 0);


  let data = ["entire_house", "private_room", "shared_room"].map( el => {
    return { label: el, value: parseInt((dataList[el].num_available / total)*100) }
  });

  var div = d3.select("body").append("div").attr("class", "toolTip")

  let x = d3.scaleBand().rangeRound([0, width]),
      y = d3.scaleLinear().rangeRound([height, 0]),
      margin = 0,
      axisMargin = 15,
      valueMargin = 4,
      barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
      barPadding = (height-axisMargin-margin*2)*0.6/data.length,
      bar, scale, xAxis, max, labelWidth = 0;

  max = d3.max(data, function(d) { return d.value });

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

    scale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width]);

    xAxis = d3.axisBottom()
            .scale(scale)
            .tickSize(-height + 2*margin + axisMargin)

    y.domain(["Entire House", "Private Room", "Shared Room"]);
    x.domain([0, 100]);

    bar.append("rect")
            .attr("transform", "translate("+labelWidth+", 0)")
            .attr("height", barHeight)
            .attr("width", function(d){
                return scale(d.value);
            });
    bar.append("text")
            .attr("class", "value")
            .attr("y", barHeight / 2)
            .attr("dx", -valueMargin + labelWidth) //margin right
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .text(function(d){
                return (d.value+"%");
            })
            .attr("x", function(d){
                var width = this.getBBox().width;
                return Math.max(width + valueMargin, scale(d.value));
            });

    svg.insert("g",":first-child")
            .attr("class", "axisHorizontal")
            .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
            .call(xAxis);

    svg.insert("g",":first-child")
            .attr("class", "axisVertical")
            .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
            .call(xAxis);
}