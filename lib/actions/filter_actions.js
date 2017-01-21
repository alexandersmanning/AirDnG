export const UPDATE_NEIGHBORHOOD = "UPDATE_NEIGHBORHOOD";
export const GET_NEIGHBORHOODS = "GET_NEIGHBORHOOD";

export const updateNeighborhood = (neighborhoods) => ({
	type: UPDATE_NEIGHBORHOOD,
	neighborhoods
});

export const getNeighborhoods = () => ({
	type: GET_NEIGHBORHOODS
});

