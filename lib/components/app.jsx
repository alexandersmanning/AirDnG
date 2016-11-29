import React from 'react';
import ForceGraphContainer from './force_graph/force_graph_container';
import FilterSelectorContainer from './filter_selection/filter_selector_container';
import NeighborhoodStatsContainer from './neighborhood_stats/neighborhood_stats_container'

const App = () => { 
	return (
		<div className="main-container">
			<header className="main-nav-bar">
				<h1 className="header-logo">AirDnG</h1>
			</header>
			<aside className="sidebar">
				<div className="filter-container">
					<span className="filter-label">filter by neighborhood</span>
					<FilterSelectorContainer/>
				</div>
				<NeighborhoodStatsContainer />
			</aside>
			<content className="main">
				<h2 className="main-title">Common Words By Neighborhood</h2>
				<ForceGraphContainer />
			</content>
		</div>
	)
};

export default App;