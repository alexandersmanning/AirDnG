import React from 'react';
import ReactDOM from 'react-dom';
import { createSidewaysGraph } from '../../utils/d3_side_ways';

class IndividualStats extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (Object.keys(this.props.stats).length !== 0) {
			createSidewaysGraph(this.props.stats, ReactDOM.findDOMNode(this.refs.bargraph))
		}
	}

	componentDidUpdate() {
		createSidewaysGraph(this.props.stats, ReactDOM.findDOMNode(this.refs.bargraph))
	}

	render() {
		return (
			<div className="individual-stats-container">
				<svg ref="bargraph">
				</svg>
			</div>
			)
	}
};

export default IndividualStats