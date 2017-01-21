// export const GET_STATS_LIST = "GET_STATS_LIST";
export const RECEIVE_STATS_LIST = "RECEIVE_STATS_LIST";
export const ADJUST_STATS_LIST = "ADJUST_STATS_LIST";

export const receiveStatsList = (statsList) => ({
	type: RECEIVE_STATS_LIST,
	statsList
});

export const adjustStatsList = (statsList) => ({
	type: ADJUST_STATS_LIST,
	statsList
})