import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPosts = (page, router) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });

        const { data } = await api.getPosts(page);

        dispatch({ type: actionType.GET_ALL, payload: data });
        dispatch({ type: actionType.END_LOADING });
    } catch (error) {
        console.log(error);
    }
}