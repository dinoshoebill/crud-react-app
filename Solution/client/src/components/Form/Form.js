import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, CircularProgress, Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import Input from '../Input/Input';
import { createPost, updatePost, getPostInfo } from '../../actions/post';

const initialState = { title: '', message: '', tags: '', selectedFile: 'data:image/png;base64,' };

const Form = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();
    const { post, isLoadingPost } = useSelector((state) => state.post);

    const user = useSelector((state) => state.auth.user);
    const isGoogle = user?.token?.length > 500;

    const [postData, setPostData] = useState(initialState);
    const [disableButton, setDisableButton] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (id && post?._id === id) {
            setPostData({ title: post.title, message: post.message, tags: post.tags.join(','), selectedFile: post.selectedFile });
        } else if (id) {
            dispatch(getPostInfo(id, history));
        } else {
            setPostData(initialState);
        }
    }, [id, post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setDisableButton(false);

        try {
            if (id !== undefined) {
                await dispatch(updatePost(id, postData, history));
            } else {
                if (isGoogle)
                    await dispatch(createPost({ ...postData, username: user?.result?.name }, history));
                else
                    await dispatch(createPost({ ...postData, username: user?.result?.username }, history));
            }
        } catch (error) {
            setDisableButton(false);
        }
    };

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    }

    const clear = () => {
        setPostData(initialState);
    };

    return (
        (id && isLoadingPost) ?
            <Grid container className={classes.loadingIcon} justifyContent="center">
                <CircularProgress />
            </Grid>
            :
            <Paper className={classes.mainContainer}>
                <form className={classes.form}>
                    <Input value={postData.title} error={isSubmitted && (postData.title.length < 3 || postData.title.length > 50)} name="title" helperText="Requirements: min/max 3/50 characters" label="Title" handleChange={handleChange} autoFocus required fullWidth />
                    <Input value={postData.message} error={isSubmitted && (postData.message.length < 50 || postData.message.length > 500)} name="message" label="Message" helperText="Requirements: min/max 50/500 characters" handleChange={handleChange} multiline minRows={4} required fullWidth />
                    <Input value={postData.tags} error={isSubmitted && (postData.tags.trim().length < 1 || postData.tags.length > 314)} name="tags" helperText="Requirements: min/max 1/15 tags (max 20 characters)" label="Tags (coma separated, e.g. happy,fun,new)" handleChange={handleChange} required fullWidth />
                    <div className={classes.fileInput}><FileBase required type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                    <Button disabled={disableButton} variant="contained" color="primary" size="large" type="submit" onClick={handleSubmit} fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                    <Button component={Link} to={`/posts${id !== undefined ? `/${id}` : ''}`} variant="contained" color="secondary" size="small" fullWidth>Cancel</Button>
                </form>
            </Paper >
    )
}

export default Form;