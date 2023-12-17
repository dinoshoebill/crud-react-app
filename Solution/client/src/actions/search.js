import * as actionType from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPostsBySearch = (query, page, router) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });

        const { data } = await api.getPostsBySearch(query, page);

        dispatch({ type: actionType.GET_BY_SEARCH, payload: data });
        dispatch({ type: actionType.END_LOADING });
    } catch (error) {
        console.log(error);
        router.push("/");
    }
}