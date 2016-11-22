import * as d3 from 'd3';
// let words = require('../assets/data_sets/words_by_neighbourhoods')
// let word_test = require('../assets/data_sets/words_test.json')



document.addEventListener("DOMContentLoaded", () => {
	let word_test = './assets/data_sets/words_test.json'

	let svg = d3.select("svg"),
			width = +svg.attr("width"),
			height = +svg.attr("height");

	let color = d3.scaleOrdinal(d3.schemeCategory20);	

	let simulation = d3.forceSimulation()
			 .force("link", d3.forceLink().id(function(d) { return d.id; }))
			 .force("charge", d3.forceManyBody())
			 .force("center", d3.forceCenter(width / 2, height / 2));

	let nodes = []

	d3.json(word_test, function(error, graph) {
		if (error) throw error;
		let link = svg.append("g")
									.attr("class", "links")
									.selectAll("line")
									.data(graph.links)
									.enter().append("line")
									.attr("stroke-width", function(d) { 
										return Math.sqrt(d.count)
									});

		let node = svg.append("g")
									.attr("class", "nodes")
									.selectAll("circle")
									.data(graph.nodes)
									.enter().append("circle")
										.attr("r", function(d) { return d.count}) 
										.attr("fill", function(d) { return color(
											parseInt(Math.sqrt(d.count)))
										})
										.call(d3.drag()
											.on("start", dragstarted)
											.on("drag", dragged)
											.on("end", dragended)
										);

		nodes.push(node);

		node.append("title")
				.text(function(d) { return d.id; });

		simulation.nodes(graph.nodes)
							.on("tick", ticked);

		simulation.force("link")
							.links(graph.links);

		function ticked() {
			link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      var q = d3.quadtree(nodes),
      i = 0,
      n = nodes.length;

      while (++i < n) q.visit(collide(nodes[i]));

    	node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
		}
	});

	function dragstarted(d) {
	  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	function dragged(d) {
	  d.fx = d3.event.x;
	  d.fy = d3.event.y;
	}

	function dragended(d) {
	  if (!d3.event.active) simulation.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}

	function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}
})