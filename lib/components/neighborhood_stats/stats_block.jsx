import React from 'react'

const StatsBlock = ({stats}) => (
	<div className="room-stats">
			<div className="stats-lead-metric">
				<span className="stats-metric">
					${parseInt(stats["average_price"])}
				</span>
			</div>
			<div className="stats-title">
				<span>Average Cost/Day</span>
			</div>
			<div className="stats-secondary-metric">
				<span className="stats-metric">
					${parseInt(stats["median_price"])}
				</span>
			</div>
			<div className="stats-title">
				<span>Median Cost/Day</span>
			</div>
			<div className="stats-secondary-metric">
				<span className="stats-metric">
					${parseInt(stats["twenty_fifth"])} - 
					${parseInt(stats["seventy_fifth"])}
				</span>
			</div>
			<div className="stats-title">
				<span>Rental Price Range</span>
			</div>
		<div className="stats-secondary-metric">
			<span className="stats-metric">
				{parseInt(stats["num_available"])} 
			</span>
		</div>
		<div className="stats-title">
			<span>Number of Available Units</span>
		</div>
	</div>
) 

export default StatsBlock;