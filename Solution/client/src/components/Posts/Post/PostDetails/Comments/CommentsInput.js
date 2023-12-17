import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@material-ui/core';

import useStyles from '../styles';
import Input from '../../../../Input/Input';
import { useHistory } from 'react-router-dom';
import { commentPost } from '../../../../../actions/post';

const CommentInput = ({ id }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.auth.user);
    const isGoogle = user?.token?.length > 500;

    const [newComment, setNewComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setNewComment(e.target.value);
    }

    const postComment = async () => {
        setIsSubmitted(true);
        try {
            if (isGoogle)
                await dispatch(commentPost(id, { comment: newComment, username: user?.result?.name }, history));
            else
                await dispatch(commentPost(id, { comment: newComment, username: user?.result?.username }, history));
        } catch (error) {
            // intentionally blank
        } finally {
            setNewComment('');
            setIsSubmitted(false);
        }
    }

    return (
        <>
            <div>
                <Typography variant="h5">Comments:</Typography>
            </div>
            {user?.result ?
                <div className={classes.commentSection}>
                    <Input value={newComment} handleChange={handleChange} name="comment" label="Comment" multiline minRows={2} fullWidth />
                    <Button color="primary" variant="contained" disabled={!newComment.length || isSubmitted} onClick={postComment}>Comment</Button>
                </div>
                :
                <div>
                    <a href="/auth">
                        <Button color="primary" variant="contained">Login to comment</Button>
                    </a>
                </div>
            }

        </>
    )
}

export default CommentInput;
