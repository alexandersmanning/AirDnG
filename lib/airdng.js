import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';


import * as d3 from 'd3';
let d3tip = require('d3-tip')(d3);
import { getNeighborhoods } from './utils/analyze_data.js'

document.addEventListener("DOMContentLoaded", () => {
	const preloadedState = { 
		filter: { 
			neighborhoods: ["Haight Ashbury", "Mission", "Chinatown"] 
		}
	};

	let store = configureStore(preloadedState);
	window.store = store
	const root = document.getElementById("root");
	ReactDOM.render(<Root store={store}/>, root)




	let height = window.innerHeight;
	let width = window.innerWidth;
	let word_new = getNeighborhoods(["Western Addition", "Mission", "Haight Ashbury"], 50)

	let sizeFactor = (height * width) / 1000000;

	let svg = d3.select("svg");
	svg.attr("width", width);
	svg.attr("height", height * 1.3);

	// let color = d3.scaleOrdinal()
	// 		.range([]);	

	let simulation = d3.forceSimulation()
			 .force("link", d3.forceLink().id(function(d) { return d.id; }))
			 .force("charge", d3.forceManyBody().strength(function(d){
			 		return Math.sqrt(d.count) * (-30)* sizeFactor
			 }))
			 .force("center", d3.forceCenter(width / 2, (height * 1.4) / 2));

	let tip = d3tip
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			let name = d.id.charAt(0).toUpperCase() + d.id.slice(1)
			return "<div class='tool-tip-box'><div class='node-name'>"+ name +"</div><div class='freq'>Frequency:"+ d.count+"</div><div class='tt-tail'></div></div>"
		})

	 svg.call(tip)
	 svg.data(word_new)
		
	 let link = svg.append("g")
									.attr("class", "links")
									.selectAll("line")
									.data(word_new.links)
									.enter().append("line")
									.attr("stroke-width", function(d) { 
										return 1
									});

		let node = svg.append("g")
									.attr("class", "nodes")
									.selectAll("circle")
									.data(word_new.nodes)
									.enter().append("circle")
										.attr("r", function(d) { return Math.sqrt(d.count) * sizeFactor})
										.attr("fill", function(d) { return "#000000"
										})
										.on('mouseover', tip.show)
										.on('mouseout', tip.hide)
										.on('mousedown', tip.hide)
										.call(d3.drag()
											.on("start", dragstarted)
											.on("drag", dragged)
											.on("end", dragended)
										);

		node.append("title")
				.text(function(d) { return d.id; });

		simulation.nodes(word_new.nodes)
							.on("tick", ticked);

		simulation.force("link")
							.links(word_new.links);

		function ticked() {
			link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    	node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
		}


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

})