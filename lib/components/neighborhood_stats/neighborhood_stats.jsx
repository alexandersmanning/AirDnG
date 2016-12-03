import React from 'react';
import IndividualStats from './individual_stats'
// const src = require('../../../assets/images/linegraph.gif');

class NeighborhoodStats extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// window.addEventListener('resize', () => this.forceUpdate())
	}

	render() {
		let statsItems;

		if (Object.keys(this.props.statsList).length !== 0) {
			statsItems = 
				<div className="stats-container">
						<h1 className="stats-container-title">Statistics by Neighborhood</h1>
						<ul className="neighborhood-list">
						{
							Object.keys(this.props.statsList).sort().map( el => {
								return( 
									<li className="stats-item-data" key={el}>
										<h2 className="neighborhood-name">{el}</h2>
										<IndividualStats stats={this.props.statsList[el]}/>
									</li>
									)
							})
						}
						</ul>
				</div>
		} else {
			statsItems = 
				<div className="stats-container">
					<h1 className="stats-container-title">Please Select One or More Neighborhoods Above</h1>

					<div className="no-data">
						<img className="no-data-img" src="https://res.cloudinary.com/ddvdi1pie/image/upload/v1480797309/network_ma67kw.png"/>
					</div>
				</div>	
		}

		return statsItems
	}
}

export default NeighborhoodStats