import { GET_WORD_LIST, receiveWordList, getWordList } from '../actions/force_diagram_actions'
import { UPDATE_NEIGHBORHOOD } from '../actions/filter_actions'
import { getNeighborhoods } from '../utils/analyze_data'

const forceMiddleware = ({getState, dispatch}) => next => action => {
	switch(action.type) {
		case GET_WORD_LIST:
			let wordList = getNeighborhoods(getState().filter.neighborhoods)
			dispatch(receiveWordList(wordList))
			return next(action);
		case UPDATE_NEIGHBORHOOD:
			next(action);
			dispatch(getWordList());
			break;
		default:
			return next(action);
	}
};

export default forceMiddleware;

