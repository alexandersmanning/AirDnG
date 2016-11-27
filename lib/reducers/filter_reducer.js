import { UPDATE_NEIGHBORHOOD, updateNeighborhood } from '../actions/filter_actions'

import merge from 'lodash/merge'

const FilterReducer = (state = {}, action) => {
	Object.freeze(state);
	let newState;
	debugger
	switch(action.type) {
		case UPDATE_NEIGHBORHOOD:
			return {neighborhoods: action.neighborhoods};
		default:
			return state;
	};
};

export default FilterReducer;	