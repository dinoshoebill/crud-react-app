import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPostInfo = (id, router) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING_POST });

        const { data } = await api.getPostInfo(id);

        dispatch({ type: actionType.GET_POST, payload: data });
        dispatch({ type: actionType.END_LOADING_POST });
    } catch (error) {
        console.log(error);
        router.push("/");
    }
}

export const getRecommendedPosts = (id, router) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING_RECOMMENDED_POSTS });

        const { data } = await api.getRecommendedPosts(id);

        dispatch({ type: actionType.GET_RECOMMENDED_POSTS, payload: data });
        dispatch({ type: actionType.END_LOADING_RECOMMENDED_POSTS });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, router) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: actionType.CREATE, payload: data });

        router.push(`/posts/${data.data._id}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updatePost = (id, updatedPost, router) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data } = await api.updatePost(id, updatedPost);

        dispatch({ type: actionType.UPDATE, payload: data });
        dispatch({ type: actionType.END_LOADING });
        router.push(`/posts/${id}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deletePost = (id, router) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        await api.deletePost(id);

        dispatch({ type: actionType.DELETE, payload: id });
        dispatch({ type: actionType.END_LOADING });
        router.push("/posts");
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id, router) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: actionType.LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getPostComments = (id, numOfComments, initial, router) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING_COMMENTS });
        const { data } = await api.getPostComments(id, numOfComments);

        dispatch({ type: actionType.GET_COMMENTS, payload: { ...data, initial } });
        dispatch({ type: actionType.END_LOADING_COMMENTS });
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = (id, comment, router) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(id, comment);

        dispatch({ type: actionType.COMMENT, payload: data });
    } catch (error) {
        console.log(error);
        throw error;
    }
}