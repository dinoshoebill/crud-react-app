import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

API.interceptors.response.use(success => {
    const expectedMessage =
        success.response &&
        success.response === 200 &&
        success.data.message;

    if (!expectedMessage) {
        toast.success(success.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return Promise.resolve(success);
}, error => {
    const expectedError =
        error.response &&
        error.response >= 400 &&
        error.response < 500 &&
        error.response.data.error;

    if (!expectedError) {
        toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return Promise.reject(error);
})

export const getRecommendedPosts = (id) => API.get(`/posts/${id}/recommended`);

export const getPosts = (page) => API.get(`/posts?page=${page}`);

export const getPostInfo = (id) => API.get(`/posts/${id}`);

export const getPostsBySearch = (query, page) => API.get(`/posts/search?search=${query.search}&tags=${query.tags}&page=${page}`);

export const getUserPosts = (id, page) => API.get(`/posts/${id}/userPosts?&page=${page}`);

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const likePost = (id) => API.patch(`/posts/${id}/like`);

export const commentPost = (id, comment) => API.post(`/posts/${id}/commentPost`, comment);

export const getPostComments = (id, numOfComments) => API.get(`/posts/${id}/getPostComments?numOfDisplayedComments=${numOfComments}`);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const login = (formData) => API.post('/users/login', formData);

export const signUp = (formData) => API.post('/users/signup', formData);

export const getUserInfo = (id) => API.get(`/users/${id}/info`);

export const getUserInfoNoAuth = (id) => API.get(`/users/${id}/infoNoAuth`);

export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);

export const deleteUser = (id) => API.delete(`/users/${id}`);