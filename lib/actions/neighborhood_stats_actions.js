export const GET_STATS_LIST = "GET_STATS_LIST";
export const RECEIVE_STATS_LIST = "RECEIVE_STATS_LIST";

export const getStatsList = () => ({
	type: GET_STATS_LIST
});

export const receiveStatsList = (statsList) => ({
	type: RECEIVE_STATS_LIST,
	statsList
});