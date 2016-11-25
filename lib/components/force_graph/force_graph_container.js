import { connect } from 'react-redux';
import ForceGraph from './force_graph';
import { getWordList } from '../../actions/force_diagram_actions'

const mapStateToProps = state => ({
	wordList: state.wordList	
});

const mapDispatchToProps = dispatch => ({
	getWordList: () => dispatch(getWordList())
})

export default connect(mapStateToProps, mapDispatchToProps)(ForceGraph)