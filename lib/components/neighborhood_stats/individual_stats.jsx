import React from 'react';
import ReactDOM from 'react-dom';
import StatsBlock from './stats_block'
import { createSidewaysGraph } from '../../utils/d3_side_ways';

class IndividualStats extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		
		if (Object.keys(this.props.stats).length !== 0) {
			createSidewaysGraph(this.props.stats, ReactDOM.findDOMNode(this.refs.bargraph))
			// window.addEventListener('resize', () => this.forceUpdate())
		}
	}

	componentWillUnmount() {
      // window.removeEventListener("resize", () => this.forceUpdate());
  }

	componentDidUpdate() {
		createSidewaysGraph(this.props.stats, ReactDOM.findDOMNode(this.refs.bargraph))
	}

	render() {
		let stats = this.props.stats
		return (
			<div className="individual-stats-container">
				<div className="graph-container">
					<h3 className="graph-title">Listing by House/Room Type</h3>
					<svg ref="bargraph" className="bar-graph">
					</svg>
				</div>
				<StatsBlock stats={stats}/>
			</div>	
			)
	}
};

export default IndividualStats