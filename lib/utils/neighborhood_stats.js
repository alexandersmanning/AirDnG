let jsonData = require('../../assets/data_sets/neighborhood_stats.json');
let _ = require('lodash');

export const statsByNeighborhood = (neighborhoodList) => {
	return _.pickBy(JSON.parse(jsonData), (v, k) => {
		return neighborhoodList.indexOf(k) > -1;
	});
}