import React from 'react';
import ReactDOM from 'react-dom'
import { forceLegend } from '../../utils/d3_force_legend'

class forceKey extends React.Component {
	componentDidMount() {
		forceLegend(ReactDOM.findDOMNode(this))
	}	

	componentDidUpdate() {
		forceLegend(ReactDOM.findDOMNode(this))
	}	

	render() {
		return (
			
			<svg className="force-key">
			</svg>
		)
	}

};

export default forceKey;