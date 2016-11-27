import { connect } from 'react-redux';
import { updateNeighborhood } from '../../actions/filter_actions';
import FilterSelector from './filter_selector';


const mapStateToProps = state => {
	return ({	
	filter: state.filter
})};

const mapDispatchToProps = dispatch => ({
	updateNeighborhood: (neighborhoods) => dispatch(updateNeighborhood(neighborhoods))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterSelector)