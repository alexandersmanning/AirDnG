import React from 'react';
import ForceGraphContainer from './force_graph/force_graph_container';

const App = () => { 
	return (
		<div className="main-container">
			<header className="main-nav-bar">
				<h1 className="header-logo">AirDnG</h1>
			</header>
			<ForceGraphContainer />
		</div>
	)
};

export default App;