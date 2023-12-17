import React, { useState } from 'react';
import { CircularProgress, Grid, Button, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import useStyles from '../styles';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { getPostComments } from '../../../../../actions/post';

const CommentSection = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory()

    const { id } = useParams();
    const { comments, remainingComments, isLoadingComments } = useSelector((state) => state.post);

    const loadMore = () => {
        dispatch(getPostComments(id, comments.length, false, history));
    }

    return (
        <>
            {comments?.length ?
                <>
                    <div className={classes.commentSection} >
                        {comments?.map((comment) => (
                            <Grid item key={comment._id}>
                                <Comment comment={comment} />
                            </Grid>
                        ))}
                    </div >
                    {isLoadingComments ?
                        < Grid container className={classes.loadingIcon} justifyContent="center">
                            <CircularProgress />
                        </Grid >
                        :
                        (
                            remainingComments ?
                                <div>
                                    < Button color="primary" variant="contained" fullWidth onClick={loadMore}>Load more</Button>
                                </div >
                                :
                                null
                        )
                    }
                </>
                :
                <Typography component="p">Be the first one to comment!</Typography>
            }
        </>
    )
}

export default CommentSection;
