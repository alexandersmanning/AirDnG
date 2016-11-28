import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';


import * as d3 from 'd3';
let d3tip = require('d3-tip')(d3);
import { getNeighborhoods } from './utils/analyze_data.js'

document.addEventListener("DOMContentLoaded", () => {
	const preloadedState = { 
		filter: { 
			neighborhoods: ["Haight Ashbury", "Mission", "Chinatown"] 
		},
		wordList: {}
	};

	let store = configureStore(preloadedState);
	window.store = store
	const root = document.getElementById("root");
	ReactDOM.render(<Root store={store}/>, root)
})