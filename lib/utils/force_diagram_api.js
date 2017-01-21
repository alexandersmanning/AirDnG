import { HttpClientHelper } from './http_client_helper';
import { convertNeighborhoodToHash } from './analyze_data'

export const WordListAPI = (data, success) => {
	console.log("api call")
	let parsed_data = JSON.stringify(convertNeighborhoodToHash(data)).replace(/\//g, "-");
	let newHelper = new HttpClientHelper;
	newHelper.get(`/data/${parsed_data}`, success);
};

export const NeighborhoodAPI = (success) => {
	let newHelper = new HttpClientHelper;
	newHelper.get(`/neighborhoods`, success)
}
