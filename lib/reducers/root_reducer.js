import { combineReducers } from 'redux';
import ForceReducer from './force_diagram_reducer';
import FilterReducer from './filter_reducer'

const RootReducer = combineReducers({
	wordList: ForceReducer,
	filter: FilterReducer
});

export default RootReducer;