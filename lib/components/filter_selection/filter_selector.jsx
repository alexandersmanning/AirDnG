import React from 'react';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

import { getListOfNeighborhoods } from '../../utils/analyze_data'

class FilterSelector extends React.Component {
	constructor(props){
		super(props);
		this.options = this.getNeighborhoods(getListOfNeighborhoods())

		this.state = { selected: this.getNeighborhoods(this.props.filter["neighborhoods"]) }
	}

	componentDidUpdate() {
		this.updateRemoveButton();
	}

	componentDidMount() {
		this.updateRemoveButton();
		let neighborhoods = this.state["selected"].map(el => el.value)
			this.props.updateNeighborhood(neighborhoods)
	}

	updateRemoveButton() {
		let x = document.getElementsByClassName("Select-value-icon")
		for (let i = 0; i < x.length; i++) {
			x[i].innerHTML = "x";
			x[i].innerText = "x";
		}
	}

	getNeighborhoods(neighborhoodList) {
		return neighborhoodList.map(el => {
			return {value: el, label: el}
		})
	}

	logChange(val) {
		this.setState({selected: val}, () => {
			let neighborhoods = this.state["selected"].map(el => el.value)
			this.props.updateNeighborhood(neighborhoods)
		})
	}

	render() {
		return (
			<Select
			    name="form-field-name"
			    value={this.state["selected"]}
			    multi={true}
			    options={this.options}
			    onChange={this.logChange.bind(this)}
			    placeholder="Select Neighborhoods To Compare"
				/>
			)
	}
}

export default FilterSelector;