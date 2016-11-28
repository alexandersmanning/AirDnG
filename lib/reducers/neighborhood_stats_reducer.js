import { RECEIVE_STATS_LIST } from '../actions/neighborhood_stats_actions';

const StatsReducer = (state = {}, action) => {
	Object.freeze(state);

	switch(action.type) {
		case RECEIVE_STATS_LIST:
			return action.statsList
		default:
			return state;
	}
};

export default StatsReducer;