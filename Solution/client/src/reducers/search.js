import * as actionType from '../constants/actionTypes';

const searchReducer = (state = { numberOfPages: 0, currentPage: 0, searchPosts: [], searchQuery: '', tagsQuery: [], isLoading: true, }, action) => {
    switch (action.type) {
        case actionType.START_LOADING:
            return { ...state, isLoading: true };
        case actionType.END_LOADING:
            return { ...state, isLoading: false };
        case actionType.GET_BY_SEARCH:
            return {
                ...state,
                searchPosts: action.payload.searchPosts,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        default:
            return state;
    }
};

export default searchReducer;
