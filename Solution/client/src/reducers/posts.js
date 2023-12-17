import * as actionType from '../constants/actionTypes';

const postsReducer = (state = { numberOfPages: 0, currentPage: 0, posts: [], isLoading: true, }, action) => {
    switch (action.type) {
        case actionType.START_LOADING:
            return { ...state, isLoading: true };
        case actionType.END_LOADING:
            return { ...state, isLoading: false };
        case actionType.GET_ALL:
            return {
                ...state,
                posts: action.payload.posts,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        default:
            return state;
    }
};

export default postsReducer;
