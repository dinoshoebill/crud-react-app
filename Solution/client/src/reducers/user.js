import * as actionType from '../constants/actionTypes';

const userReducer = (state = { userInfo: null, numberOfPages: 0, currentPage: 0, userPosts: [], isLoading: true }, action) => {
    switch (action.type) {
        case actionType.START_LOADING:
            return { ...state, isLoading: true };
        case actionType.END_LOADING:
            return { ...state, isLoading: false };
        case actionType.GET_USER:
            return { ...state, userInfo: action.payload.userInfo };
        case actionType.GET_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload.userPosts,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        default:
            return state;
    }
};

export default userReducer;