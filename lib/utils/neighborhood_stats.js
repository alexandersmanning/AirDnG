export const getStats = (recordList) => {
	let statsList = {};

	eval(recordList).forEach(el => {
		statsList[el["Neighborhood"]] = el["Stats"]; 
	})

	return statsList;
}