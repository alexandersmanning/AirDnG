import { combineReducer } from 'redux';
import ForceReducer from './force_diagram_reducer';

const RootReducer = combineReducers({
	wordList: ForceReducer
});

export default RootReducer;