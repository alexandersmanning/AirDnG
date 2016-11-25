import React from 'react';
import ReactDOM from 'react-dom'

import * as d3 from 'd3';
let d3tip = require('d3-tip')(d3);

class ForceGraph extends React.Component {
	// constructor(props) {
	// 	super(props)
	// }

	componentDidMount() {

		let height = 900//this.props.height;
		let width = 600//this.props.width;
		let sizeFactor = (height * width) / 1000000;
		let wordList = this.props.wordList

		let svg = d3.select(ReactDOM.findDOMNode(this));
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
	  svg.data(wordList)

	  let link = svg.select('g.links')
	  	.selectAll('line')
	  	.data(wordList.links)
	  	.enter().append('line')
	  	.attr('stroke-width', 1);

	 let node = svg.select('g.nodes')
	  .selectAll('circle')
	 	.data(wordList.nodes)
	 	.enter().append('circle')
	 		.attr("r", (d)=> { 
	 			return Math.sqrt(d.count) * sizeFactor})
			.attr("fill", function(d) { return "#000000" })
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

		simulation.nodes(wordList.nodes)
			.on('tick', () => {
			link
	      .attr("x1", function(d) { return d.source.x; })
	      .attr("y1", function(d) { return d.source.y; })
	      .attr("x2", function(d) { return d.target.x; })
	      .attr("y2", function(d) { return d.target.y; });
     node
	      .attr("cx", function(d) { return d.x; })
	      .attr("cy", function(d) { return d.y; });
			})

		simulation.force('link')
			.links(wordList.links)
	}

	ticked() {
		debugger
		link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
    node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
	}

	dragstarted(d) {
	  if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	dragged(d) {
	  d.fx = d3.event.x;
	  d.fy = d3.event.y;
	}

	dragended(d) {
	  if (!d3.event.active) this.simulation.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}

	render() {
		return (
			<svg width="600" height="900">
				<g className='links'></g>
				<g className='nodes'></g>
			</svg>
		)
	}

};

export default ForceGraph;