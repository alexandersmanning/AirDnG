import React from 'react';
import ForceGraphContainer from './force_graph/force_graph_container';
import FilterSelectorContainer from './filter_selection/filter_selector_container';
import NeighborhoodStatsContainer from './neighborhood_stats/neighborhood_stats_container'
import AboutModal from './header_modals/about_modal'
import NotesModal from './header_modals/notes_on_the_data'

import ForceKey from './force_graph/force_graph_key'

const App = () => { 
	return (
		<div className="main-container">
			<header className="main-nav-bar">
				<div className="nav-bar-logo">
					<h1 className="header-logo">AirDnG</h1>
					<span className="sub-logo">Data and Graphs for San Francisco</span>
				</div>
				<div className="header-modals">
					<AboutModal />
					<NotesModal />
				</div>
			</header>
			<aside className="sidebar">
				<div className="filter-container">
					<span className="filter-label">filter by neighborhood</span>
					<FilterSelectorContainer/>
				</div>
				<NeighborhoodStatsContainer />
			</aside>
			<content className="main">
				<div className="force-title">
						<h2 className="force-title-one">Words Used in Listings</h2>
						<h2 className="force-title-one">by Neighborhood</h2>		
					</div>
				<ForceGraphContainer />
				<content className="force-legend">
					<ForceKey/>
				</content>
			</content>
		</div>
	)
};

export default App;