import { connect } from 'react-redux';
import NeighborhoodStats from './neighborhood_stats';
import { getStatsList } from '../../actions/neighborhood_stats_actions'

const mapStateToProps = state => ({
	statsList: state.statsList,
	filter: state.filter
});

const mapDispatchToProps = dispatch => ({
	getStatsList: () => dispatch(getStatsList())
});

export default connect(mapStateToProps, mapDispatchToProps)(NeighborhoodStats)