import React from 'react';
import IndividualStats from './individual_stats'

class NeighborhoodStats extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		// if (Object.keys(this.props.statsList).length === 0) {
		// 	this.props.getStatsList();
		// }

		return (
			<div className="stats-container">
				<h1 className="stats-container-title">Statistics by Neighborhood</h1>
				<ul className="neighborhood-list">
				{
					Object.keys(this.props.statsList).sort().map( el => {
						return( 
							<li className="stats-item-data">
								<h2 className="neighborhood-name">{el}</h2>
								<IndividualStats stats={this.props.statsList[el]}/>
							</li>
							)
					})
				}
				</ul>
			</div>
		)
	}
}

export default NeighborhoodStats