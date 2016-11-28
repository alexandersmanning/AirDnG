import { GET_WORD_LIST, receiveWordList, getWordList } from '../actions/force_diagram_actions';
import { GET_STATS_LIST, receiveStatsList, getStatsList } from '../actions/neighborhood_stats_actions';

import { UPDATE_NEIGHBORHOOD } from '../actions/filter_actions';

import { getNeighborhoods } from '../utils/analyze_data';
import { statsByNeighborhood } from '../utils/neighborhood_stats';

const forceMiddleware = ({getState, dispatch}) => next => action => {
	switch(action.type) {
		case GET_WORD_LIST:
			let wordList = getNeighborhoods(getState().filter.neighborhoods)
			dispatch(receiveWordList(wordList))
			return next(action);
		case GET_STATS_LIST:
			let statsList = statsByNeighborhood(getState().filter.neighborhoods) ;
			dispatch(receiveStatsList(statsList));
			return next(action);
		case UPDATE_NEIGHBORHOOD:
			next(action);
			dispatch(getWordList());
			dispatch(getStatsList());
			break;
		default:
			return next(action);
	}
};

export default forceMiddleware;

