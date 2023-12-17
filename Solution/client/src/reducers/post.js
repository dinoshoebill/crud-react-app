import * as actionType from '../constants/actionTypes';

const postReducer = (state = { post: null, recommendedPosts: [], remainingComments: 0, numOfDisplayedComments: 0, comments: [], isLoadingPost: true, isLoadingRecommendedPosts: true, isLoadingComments: true }, action) => {
    switch (action.type) {
        case actionType.START_LOADING_POST:
            return { ...state, isLoadingPost: true };
        case actionType.END_LOADING_POST:
            return { ...state, isLoadingPost: false };
        case actionType.START_LOADING_RECOMMENDED_POSTS:
            return { ...state, isLoadingRecommendedPosts: true };
        case actionType.END_LOADING_RECOMMENDED_POSTS:
            return { ...state, isLoadingRecommendedPosts: false };
        case actionType.START_LOADING_COMMENTS:
            return { ...state, isLoadingComments: true };
        case actionType.END_LOADING_COMMENTS:
            return { ...state, isLoadingComments: false };
        case actionType.GET_POST:
            return { ...state, post: action.payload.post };
        case actionType.GET_RECOMMENDED_POSTS:
            return { ...state, recommendedPosts: action.payload.recommendedPosts };
        case actionType.COMMENT:
            state.comments.unshift(action.payload.data);
            return {
                ...state,
                numOfDisplayedComments: state.numOfDisplayedComments + 1,
            };
        case actionType.GET_COMMENTS:

            if (action.payload.initial)
                return {
                    ...state,
                    comments: action.payload.comments,
                    remainingComments: action.payload.remainingComments,
                    numOfDisplayedComments: action.payload.numOfDisplayedComments,
                };

            return {
                ...state,
                comments: state.comments.concat(action.payload.comments),
                remainingComments: action.payload.remainingComments,
                numOfDisplayedComments: action.payload.numOfDisplayedComments,
            };
        case actionType.LIKE:
            return { ...state, post: { ...state.post, likes: action.payload.data } };
        case actionType.CREATE:
            return { ...state }; // sen reccomene posts an post ata at the same time?
        case actionType.UPDATE:
            return { ...state, post: action.payload.data };
        case actionType.DELETE:
            return { ...state };
        default:
            return state;
    }
};

export default postReducer;
