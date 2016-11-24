import { GET_WORD_LIST, receiveWordList } from '../actions/force_diagram_actions'
import { getNeighborhood } from '../utils/analyze_data'

const forceMiddleware = ({getState, dispatch}) => next => action => {
	switch(action.type) {
		case GET_WORD_LIST:
			let wordList = getNeighborhood(getState().filter)
			dispatch(receiveWordList(wordlist))
			return next(action);
		default:
			return next(action);
	}
};

export default forceMiddleware;

