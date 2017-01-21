import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener("DOMContentLoaded", () => {
	const preloadedState = { 
		filter: { 
			neighborhoods: ["Haight Ashbury", "Mission", "Chinatown"] 
		},
		wordList: {},
		statsList: {}
	};

	let store = configureStore(preloadedState);
	window.store = store;
	window.ReactDOM = ReactDOM;
	const root = document.getElementById("root");
	ReactDOM.render(<Root store={store}/>, root)
})