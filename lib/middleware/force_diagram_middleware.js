import { GET_WORD_LIST, 
	ADJUST_WORD_LIST,
	adjustWordList,
	receiveWordList, 
	getWordList,
	} from '../actions/force_diagram_actions';


import { GET_STATS_LIST, receiveStatsList, getStatsList } from '../actions/neighborhood_stats_actions';

import { UPDATE_NEIGHBORHOOD } from '../actions/filter_actions';

import { WordListAPI } from '../utils/force_diagram_api';
import { getNeighborhoods } from '../utils/analyze_data';
import { statsByNeighborhood } from '../utils/neighborhood_stats';

const forceMiddleware = ({getState, dispatch}) => next => action => {
	const getSuccess = (wordList) => { dispatch(adjustWordList(wordList))};

	switch(action.type) {
		case GET_WORD_LIST:
			let neighborhoods = getState().filter.neighborhoods;
			if (neighborhoods.length === 0) { getSuccess([]) }
				else {
					WordListAPI(neighborhoods, getSuccess)
				}
			return next(action);
		case ADJUST_WORD_LIST:
			let nodeList = getNeighborhoods(action.wordList);
			dispatch(receiveWordList(nodeList));
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

