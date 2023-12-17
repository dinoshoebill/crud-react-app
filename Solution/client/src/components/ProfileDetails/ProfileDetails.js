import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import useStyles from './styles';
import UploadedPosts from './UploadedPosts/UploadedPosts';
import { getUserInfo, getUserInfoNoAuth, getUserPosts } from '../../actions/user';
import { GET_USER } from '../../constants/actionTypes';
import ProfileInformation from './ProfileInformation/ProfileInformation';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ProfileDetails = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();

    const { id } = useParams();
    const user = useSelector((state) => state.auth.user);

    const page = query.get('page') || 1;

    useEffect(() => {
        if (user?.result?._id === id) {
            dispatch(getUserInfo(id, history));
        } else if (user?.result?.sub === id) {
            dispatch({ type: GET_USER, payload: { userInfo: { username: user.result.name, email: user.result.email } } });
        } else {
            dispatch(getUserInfoNoAuth(id, history));
        }

        dispatch(getUserPosts(id, page, history));
    }, [id]);

    useEffect(() => {
        dispatch(getUserPosts(id, page, history));
    }, [page]);

    const changePage = (e, p) => {
        if (p !== page)
            history.push(`/users/${id}/posts?page=${p}`);
    }

    return (
        <>
            <ProfileInformation />
            <UploadedPosts page={page} changePage={changePage} />
        </>
    )
}

export default ProfileDetails;
