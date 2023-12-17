import * as actionType from '../constants/actionTypes';
import * as api from '../api/index';
import { toast } from 'react-toastify';

export const login = (loginData, router) => async (dispatch) => {
    try {
        const { data } = await api.login(loginData);

        dispatch({ type: actionType.AUTH, payload: data });

        router.push('/posts');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const logout = (router) => (dispatch) => {
    dispatch({ type: actionType.LOGOUT });

    toast.success("You successfully logged out", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    router.push("/");
}

export const signUp = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: actionType.AUTH, payload: data });

        router.push('/posts');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateUser = (id, updatedUser, router) => async (dispatch) => {
    try {
        await api.updateUser(id, updatedUser);

        dispatch({ type: actionType.LOGOUT });

        toast.info("You were logged out due to profile changes", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        router.push("/auth");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteUser = (id, router) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });

        await api.deleteUser(id);

        dispatch({ type: actionType.LOGOUT });
        dispatch({ type: actionType.END_LOADING });
        router.push("/posts");
    } catch (error) {
        console.log(error);
    }
}