import * as d3 from 'd3';
let d3tip = require('d3-tip')(d3);

export const forceLegend = function(svgDOM) {
	let svg = d3.select(svgDOM);
	let width = 900;
	let height = 40;
	svg.attr("height", height);
	svg.attr("width", width);

	let color = d3.scaleLinear().domain([0,1500]).range(["yellow","red"]);
	let data = [{value: 0}, {value: 250}, {value: 500}, {value: 750}, {value: 1000}, {value: 1250}]

	let legend = svg.append("g")
			.attr("class", "legend")
			.attr("transform", "translate(0, 20)")

	legend.append("text")
		.attr("class", "color-description")
		.attr("x", 0)
		.attr("y", -2)
		.text("Mentions of word in listing:")

	let bars = legend.append("g")
		.attr("class", "color-scale")
		.attr("transform", "translate(150,-10)")

	let x = -25;
	
	bars.selectAll('rect')
		.data(data)
		.enter()
		.append("rect")
		.attr("class", "key-rect-bar")
		.attr("height", 8)
		.attr("width", 25)
		.attr("x", function(d) {
			x += 25
			return x
		})
		.attr("fill", function(d) { return color(d.value) })

	let scale = d3.scaleLinear()
      .domain([0, 1500])
      .range([0, 150]);

	let xAxis = d3.axisBottom()
      .scale(scale)
      .ticks(4)
      .tickSize(10)

   bars.insert("g",":first-child")
      .attr("class", "axisHorizontal-legend")
      .attr("transform", "translate(0, 0)")
      .call(xAxis);

     let circleData = [
     		{value: 7, color: '#FFAB00', x: 55, textDist: 43, text:"Word:"},
     		{value: 7, color: "#006BCC", x: 0, textDist:90, text:"Neighborhood:"}
     		]

    let circleContainer = legend.append("g")
    	.attr("class", "circle-keys")
			.attr("transform", `translate(325,0)`)
    	.selectAll("g")
    	.data(circleData)
    	.enter().append("g")
    	.attr("class", "circle-key-individual")
			.attr("transform", function(d){
				return `translate(${d.x},0)`
			})

			let labelWidth = 0;

			circleContainer
			.append('text')
			.text(function(d) { return d.text })
			.attr("x", function(d) { return d.x })
			.attr("y", -2);
			
			circleContainer
			.append('circle')
    	.attr("r", function(d) { return d.value })
			.attr("fill", function(d) { return d.color })
			.attr("cx", function(d) { return d.x + d.textDist})
			.attr("cy", -7);


}