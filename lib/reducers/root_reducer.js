import { combineReducers } from 'redux';
import ForceReducer from './force_diagram_reducer';
import FilterReducer from './filter_reducer'
import StatsReducer from './neighborhood_stats_reducer'

const RootReducer = combineReducers({
	wordList: ForceReducer,
	filter: FilterReducer,
	statsList: StatsReducer
});

export default RootReducer;