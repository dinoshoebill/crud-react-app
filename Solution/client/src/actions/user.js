import * as actionType from '../constants/actionTypes';
import * as api from '../api/index';

export const getUserPosts = (id, page, router) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data } = await api.getUserPosts(id, page);

        dispatch({ type: actionType.GET_USER_POSTS, payload: data });
        dispatch({ type: actionType.END_LOADING });
    } catch (error) {
        console.log(error);
        router.push("/");
    }
}

export const getUserInfo = (id, router) => async (dispatch) => {
    try {
        const { data } = await api.getUserInfo(id);

        dispatch({ type: actionType.GET_USER, payload: data });
    } catch (error) {
        console.log(error);
        router.push("/");
    }
}

export const getUserInfoNoAuth = (id, router) => async (dispatch) => {
    try {
        const { data } = await api.getUserInfoNoAuth(id);

        dispatch({ type: actionType.GET_USER, payload: data });
    } catch (error) {
        console.log(error);
        router.push("/");
    }
}