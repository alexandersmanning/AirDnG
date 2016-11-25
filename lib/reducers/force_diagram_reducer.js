import { RECEIVE_WORD_LIST } from '../actions/force_diagram_actions';
import merge from 'lodash/merge';


const ForceReducer = (state = {}, action)  => {
	Object.freeze(state);
	let newState;

	switch(action.type) {
		case RECEIVE_WORD_LIST:
			return action.wordList;
		default:
			return state;
	}
};

export default ForceReducer;