import * as d3 from 'd3';
let d3tip = require('d3-tip')(d3);

export const createSidewaysGraph = function(dataList, svgDOM) {

  let svg = d3.select(svgDOM);
  let width = parseInt(svg.style("width"))//350//window.innerWidth;
  let height = .9 * width//250//window.innerHeight;
  svg.attr("height", height);
  
  svg.selectAll("*").remove();

  let total = ["entire_house", "private_room", "shared_room"].reduce( (sum, el)=> {
    return sum + dataList[el].num_available
  }, 0);


  let data = ["entire_house", "private_room", "shared_room"].map( el => {
    return { label: el.split("_").join(' '), value: parseInt((dataList[el].num_available / total)*100), full_data: dataList[el] }
  });

  let x = d3.scaleBand().rangeRound([0, width]),
      y = d3.scaleLinear().rangeRound([height, 0]),
      margin = 0,
      axisMargin = 20,
      valueMargin = 4,
      barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
      barPadding = (height-axisMargin-margin*2)*0.6/data.length,
      bar, scale, xAxis, max, labelWidth = 0;

  let color = d3.scaleLinear().domain([0,100]).range(["yellow","red"]);

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

  let tip = d3tip
    .attr('class', 'd3-tip')
    .offset((d, item) => { 
      return [-10, 40]
    })
    .html(function(d) {
      let name = d.label.split(' ').map(el => {
        return el.charAt(0).toUpperCase() + el.slice(1)
      }).join(' ')
      let fullData = d['full_data']
      return (`<div class='tool-tip-box'>
              <div class='bar-name'><h2>${name}</h2></div>
              <div class='bar-data'>
                <h4 class='bar-data-title'>
                  Average Price: $${parseInt(fullData['average_price'])}
                </h4>
                <h4 class='bar-data-title'>
                  Median Price: $${parseInt(fullData['median_price'])}
                </h4>
                <h4 class='bar-data-title'>
                  Price Range: $${parseInt(fullData['twenty_fifth'])} - $${parseInt(fullData['seventy_fifth'])}
                </h4>
                <h4 class='bar-data-title'>
                 Units Available: ${parseInt(fullData['num_available'])}
                </h4>
              </div>
              <div class='tt-tail'></div>
            </div>`)
    })  

   bar.call(tip)

   bar.append("text")
            .attr("class", "label")
            .attr("y", barHeight /2)
            .attr("dy", ".35em") //vertical align middle
            .text(function(d){
                return d.label;
            }).each(function() {
        labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width))+ 2;
    });

    scale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width - axisMargin]);

    xAxis = d3.axisBottom()
            .scale(scale)
            .ticks(6)
            .tickSize(-width + 2*margin + axisMargin)

    bar.append("rect")
            .attr("class", "rect-bar")
            .attr("transform", "translate("+labelWidth+", 0)")
            .attr("height", barHeight)
            .attr("width", function(d){
                return scale(d.value);
            })
            .attr("fill", function(d) { return color(d.value)})

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
            })
            .attr("fill", "#00000")
      
    bar.on('mouseover', function(d){
              tip.show(d, this)})
          .on('mouseout', tip.hide)
          .on('mousedown', tip.hide);;
            

    svg.insert("g",":first-child")
            .attr("class", "axisHorizontal")
            .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
            .call(xAxis);

  


}