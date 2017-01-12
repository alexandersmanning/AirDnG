export const GET_WORD_LIST = "GET_WORD_LIST";
export const RECEIVE_WORD_LIST = "RECEIVE_WORD_LIST";
export const ADJUST_WORD_LIST = "ADJUST_WORD_LIST";

export const getWordList = () => ({
	type: GET_WORD_LIST
});

export const adjustWordList = (wordList) => ({
	type: ADJUST_WORD_LIST,
	wordList
})

export const receiveWordList = (wordList) => ({
	type: RECEIVE_WORD_LIST,
	wordList
});