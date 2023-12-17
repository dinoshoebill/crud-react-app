import React from 'react';
import { CircularProgress, Grid, Grow, Paper, Typography } from '@material-ui/core';

import useStyles from '../styles';
import Post from '../../Posts/Post/Post';
import Pagination from '../../Pagination/Pagination';
import { useSelector } from 'react-redux';

const UploadedPosts = ({ page, changePage }) => {

    const classes = useStyles();

    const { userPosts, numberOfPages, isLoading } = useSelector((state) => state.user);

    return (<>
        <Paper className={classes.mainContainer}>
            <Typography variant="h5">Uploaded posts:</Typography>
        </Paper>
        {isLoading ?
            <Grid container className={classes.loadingIcon} justifyContent="center">
                <CircularProgress />
            </Grid>
            :
            (userPosts?.length ?
                < Grow in>
                    <>
                        <Grid container className={classes.postsContainer} spacing={3}>
                            {userPosts?.map((post) => (
                                <Grid item key={post._id} xs={12} sm={9} md={6} lg={3}>
                                    <Post post={post} />
                                </Grid>
                            ))}
                        </Grid>
                        <Pagination page={page} changePage={changePage} numberOfPages={numberOfPages} />
                    </>
                </Grow >
                :
                <Paper className={classes.noPosts} >
                    <Typography component="p">No posts</Typography>
                </Paper>
            )}
    </>
    )
}

export default UploadedPosts
