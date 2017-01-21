import React from 'react';
import ReactDOM from 'react-dom'
import { createForceGraph } from '../../utils/d3_force_graph'

class ForceGraph extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		window.addEventListener('resize', () => { this.forceUpdate() });
		if (Object.keys(this.props.wordList).length !== 0) {
			createForceGraph(this.props.wordList, ReactDOM.findDOMNode(this))
		}
	}	

	componentDidUpdate() {
		createForceGraph(this.props.wordList, ReactDOM.findDOMNode(this))
	}	

	render() {
		return (
			<svg className="force-diagram">
			</svg>
		)
	}

};

export default ForceGraph;