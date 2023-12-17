import React, { useEffect, useState } from 'react';
import { Paper, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import useStyles from './styles';
import CommentInput from './Comments/CommentsInput';
import { getPostInfo, getPostComments, getRecommendedPosts } from '../../../../actions/post';
import PostInformation from './PostInformation/PostInformation';
import CommentSection from './Comments/CommentSection';
import RecommendedPosts from './RecommendedPosts/RecomendedPosts';

const PostDetails = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();

    const { post } = useSelector((state) => state.post);

    const [switchView, setSwitchView] = useState(false);

    useEffect(() => {
        dispatch(getRecommendedPosts(id, history));
        dispatch(getPostInfo(id, history));
        dispatch(getPostComments(id, 0, true, history));
    }, [id]);

    const changeView = () => {
        setSwitchView(!switchView);
    }

    return (
        <>
            <PostInformation />
            <Paper className={classes.mainContainer}>
                <div className={classes.switchView}>
                    <Button color="primary" variant={!switchView ? "contained" : null} onClick={changeView} fullWidth>Recommended posts</Button>
                    <Button color="primary" variant={switchView ? "contained" : null} onClick={changeView} fullWidth>Comments</Button>
                </div>
            </Paper>
            {switchView ?
                <Paper className={classes.mainContainer}>
                    <div className={classes.card}>
                        <div className={classes.section}>
                            <CommentInput id={id} />
                            <CommentSection id={id} />
                        </div>
                    </div>
                </Paper >
                :
                <RecommendedPosts />
            }
        </>
    )
}

export default PostDetails;