import React from 'react';
import { CircularProgress, Button, Grid, Link, Paper, Typography } from '@material-ui/core';
import { RModalImages } from 'react-modal-images';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import useStyles from '../styles';
import noImage from '../../../../../images/emptyImage.png';
import Likes from '../../Likes';
import { deletePost, likePost } from '../../../../../actions/post';

const PostInformation = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.auth.user);

    const { post, isLoadingPost } = useSelector((state) => state.post);

    const handleEdit = () => {
        history.push(`/posts/${post._id}/edit`);
    }

    const handleDelete = async (id) => {
        dispatch(deletePost(id, history));
    }

    const handleLike = () => {
        dispatch(likePost(post._id, history));
    }

    return (
        <>
            {isLoadingPost ?
                <Grid container className={classes.loadingIcon} justifyContent="center" >
                    <CircularProgress />
                </Grid >
                :
                <Paper className={classes.mainContainer}>
                    <div className={classes.card}>
                        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) &&
                            <div className={classes.actions}>
                                <Button color="primary" variant="outlined" onClick={handleEdit}><MoreHorizIcon fontSize="medium" /></Button>
                                <Button color="secondary" variant="outlined" onClick={() => handleDelete(post._id)} startIcon={<DeleteIcon fontSize="small" />}>Delete</Button>
                            </div>
                        }
                    </div>
                    <div className={classes.card}>
                        <div className={classes.section}>
                            <div className={classes.imageSection}>
                                <RModalImages style={{ borderRadius: '24px' }} small={post.selectedFile !== 'data:image/png;base64,' ? post.selectedFile : noImage} medium={post.selectedFile !== 'data:image/png;base64,' ? post.selectedFile : noImage} large={post.selectedFile !== 'data:image/png;base64,' ? post.selectedFile : noImage} />
                            </div>
                            <div>
                                {post.message.split(/\n/).map((line, index) => <Typography variant="body1" component="p" key={index}>{line}</Typography>)}
                                <Typography variant="body2" color="textSecondary" component="p">{post.tags.map((tag) => `#${tag} `)}</Typography>
                                <Link href={`/users/${post.creator}`} variant="h6" underline="hover">Created by: {post.username}</Link>
                                <Typography variant="body1" color="textSecondary" component="p">{moment(post.createdAt).fromNow()}</Typography>
                                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                                    <Likes user={user} post={post} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Paper >
            }
        </>

    )
}

export default PostInformation;
