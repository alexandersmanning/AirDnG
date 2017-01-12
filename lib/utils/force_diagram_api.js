import { HttpClientHelper } from './http_client_helper';
import { convertNeighborhoodToHash } from './analyze_data'

export const WordListAPI = (data, success) => {
	let parsed_data = JSON.stringify(convertNeighborhoodToHash(data)).replace(/\//g, "-");
	let newHelper = new HttpClientHelper;
	newHelper.get(`/data/${parsed_data}`, success);
};
