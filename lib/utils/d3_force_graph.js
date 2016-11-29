import * as d3 from 'd3';
let d3tip = require('d3-tip')(d3);

export const createForceGraph = function(wordList, svgDOM) {
	
	let svg = d3.select(svgDOM);
	svg.selectAll("*").remove();
	let color = d3.scaleLinear().domain([0,1500]).range(["yellow","red"]);

	let width = parseInt(svg.style("width"))
	let height = parseInt(svg.style("height"))
	let sizeFactor = (height * width) / 1000000;

	let simulation = d3.forceSimulation()
			 .force("link", d3.forceLink().id(function(d) { return d.id; }))
			 .force("charge", d3.forceManyBody().strength(function(d){
			 		return Math.sqrt(d.count) * (-30)* sizeFactor
			 }))
			 .force("center", d3.forceCenter(width / 2, height / 2))
			 ;

	let tip = d3tip
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			let name = d.id.charAt(0).toUpperCase() + d.id.slice(1)
			return "<div class='tool-tip-box'><div class='node-name'>"+ name +"</div><div class='freq'>Frequency:"+ d.count+"</div><div class='tt-tail'></div></div>"
		})	

	 svg.call(tip)
	 svg.data(wordList)
		
	 let link = svg.append("g")
									.attr("class", "links")
									.selectAll("line")
									.data(wordList.links)
									.enter().append("line")
									.attr("stroke-width", function(d) { 
										return 1
									});

		let node = svg.append("g")
									.attr("class", "nodes")
									.selectAll("circle")
									.data(wordList.nodes)
									.enter().append("circle")
										.attr("r", function(d) { return Math.sqrt(d.count) * sizeFactor})
										.attr("fill", function(d) { 
											if (d.isNeighborhood) {
												return "#006bcc";
											} else {
												return color(d.count);
											}
										})
										.on('mouseover', tip.show)
										.on('mouseout', tip.hide)
										.on('mousedown', tip.hide)
										.call(d3.drag()
											.on("start", function(d) {
												if (!d3.event.active) {
												 simulation.alphaTarget(0.3).restart();
												 d.fx = d.x;
		  									 d.fy = d.y;
		  									}
		  								})
											.on("drag", function(d) {
												d.fx = d3.event.x;
	  										d.fy = d3.event.y;
											})
											.on("end", function(d) {
												if (!d3.event.active) {
												 simulation.alphaTarget(0);
	  										 d.fx = null;
	  										 d.fy = null;
		  									}
											})
										);

		node.append("title")
				.text(function(d) { return d.id; });

		simulation.nodes(wordList.nodes)
							.on("tick", () => {
								link
						      .attr("x1", function(d) { return d.source.x; })
						      .attr("y1", function(d) { return d.source.y; })
						      .attr("x2", function(d) { return d.target.x; })
						      .attr("y2", function(d) { return d.target.y; });

						  	node
						      .attr("cx", function(d) { 
						      	let dx = d.x;
						      	let size = Math.sqrt(d.count) * sizeFactor;

						      	if((dx - size) < 0) { return size };
						      	if((dx + size) > width) { return (width - size)}
						      	return dx; 
						    	})
						      .attr("cy", function(d) { 
						      	let dy = d.y;
						      	let size = Math.sqrt(d.count) * sizeFactor;

						      	if((dy - size) < 0) { return size };
						      	if((dy + size) > height) { return (height - size)}
						      	return dy; 
						      });
							});

		simulation.force("link")
							.links(wordList.links);

		// simulation.force("size", [width, height])
}
