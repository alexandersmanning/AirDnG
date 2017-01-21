import React from 'react';
import ReactDOM from 'react-dom'
import { createForceGraph } from '../../utils/d3_force_graph'

class ForceGraph extends React.Component {
	constructor(props) {
		super(props)
		// this._debounce = this._debounce.bind(this)
	}

	_debounce(callback, wait, immediate) {
		let timeout;
		return (...args) => {
			let later = () => {
				timeout = null;
				callback.apply(this, args);
			}
		};

		let callNow = !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait || 200);
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