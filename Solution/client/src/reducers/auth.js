import * as actionType from '../constants/actionTypes';
import decoder from 'jwt-decode';

const initialState = () => {

    const user = JSON.parse(localStorage.getItem('profile'));
    if (!user) return null;

    const token = user?.token;

    if (token) {
        const decodedToken = decoder(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            localStorage.clear();
            return null;
        }
    }

    if (user && user?.token) return user;

    return null;
}

const authReducer = (state = { user: initialState(), isLoading: true }, action) => {
    switch (action.type) {
        case actionType.START_LOADING:
            return { ...state, isLoading: true };
        case actionType.END_LOADING:
            return { ...state, isLoading: false };
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({ result: action.payload.result, token: action.payload.token }));
            return { ...state, user: { result: action.payload.result, token: action.payload.token } };
        case actionType.LOGOUT:
            localStorage.clear();
            return { ...state, user: null };
        default:
            return state;
    }
};

export default authReducer;