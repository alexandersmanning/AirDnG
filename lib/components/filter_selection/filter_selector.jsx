import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class FilterSelector extends React.Component {
	constructor(props){
		super(props);
		this.options = [
			{value: 'Mission', label: 'Mission'},
			{value: 'Haight Ashbury', label: 'Haight Ashbury'},
			{value: 'Chinatown', label: 'Chinatown'}
			]

		this.state = { selected: this.getNeighborhoods() }
	}

	getNeighborhoods() {
		return this.props.filter["neighborhoods"].map(el => {
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
				/>
			)
	}
}

export default FilterSelector;