import React from 'react';
import IndividualStats from './individual_stats'

class NeighborhoodStats extends React.Component {
	constructor(props) {
		super(props)
		this.state = { width: 0 }
	}

	_updateWidth() {
		this.setState({width: document.getElementById("sidebar").offsetWidth})
	}
 
 componentDidMount() {
		window.addEventListener('resize', this._updateWidth.bind(this) )
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
		} else if (this.props.filter["neighborhoods"].length === 0) {
			statsItems = 
				<div className="stats-container">
					<h1 className="stats-container-title">Please Select One or More Neighborhoods Above</h1>

					<div className="no-data">
						<img className="no-data-img" src="https://res.cloudinary.com/ddvdi1pie/image/upload/v1480797309/network_ma67kw.png"/>
					</div>
				</div>	
		} else {
			statsItems = 
				<div className="stats-container">
						<h1 className="stats-container-title">Statistics by Neighborhood</h1>
				</div>
		}

		return statsItems
	}
}

export default NeighborhoodStats