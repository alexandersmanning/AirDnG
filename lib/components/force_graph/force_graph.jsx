import React from 'react';
import ReactDOM from 'react-dom'
import { createForceGraph } from '../../utils/d3_force_graph'

import * as d3 from 'd3';
let d3tip = require('d3-tip')(d3);

class ForceGraph extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		if (Object.keys(this.props.wordList).length !== 0) {
			createForceGraph(this.props.wordList, ReactDOM.findDOMNode(this))
		}
	}	

	componentDidUpdate() {
		createForceGraph(this.props.wordList, ReactDOM.findDOMNode(this))
	}	

	render() {
		if (Object.keys(this.props.wordList).length === 0) {
			this.props.getWordList();
		}
		return (
			<svg>
				<g className='links'></g>
				<g className='nodes'></g>
			</svg>
		)
	}

};

export default ForceGraph;