export const GET_WORD_LIST = "GET_WORD_LIST";
export const RECEIVE_WORD_LIST = "RECEIVE_WORD_LIST";

export const getWordList = (neighborhoods) => ({
	type: GET_WORD_LIST,
	neighborhoods
});

export const receiveWordList = (wordList) => ({
	type: RECEIVE_WORD_LIST,
	wordList	
})