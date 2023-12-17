import React from 'react';
import { CircularProgress, Grid, Grow, Paper, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';


import useStyles from '../../../styles';
import Post from '../../Post';

const RecommendedPosts = () => {

    const classes = useStyles();

    const { recommendedPosts, isLoadingRecommendedPosts } = useSelector((state) => state.post);

    return <>
        {isLoadingRecommendedPosts ?
            <Grid container className={classes.loadingIcon} justifyContent="center">
                <CircularProgress />
            </Grid>
            :
            (recommendedPosts?.length ?
                <Grow in>
                    <Grid container className={classes.postsContainer} spacing={3}>
                        {recommendedPosts?.map((post) => (
                            <Grid item key={post._id} xs={12} sm={9} md={6} lg={3}>
                                <Post post={post} />
                            </Grid>
                        ))}
                    </Grid>
                </Grow>
                :
                <Paper className={classes.noPosts} >
                    <Typography component="p">No posts</Typography>
                </Paper>
            )
        }
    </>
}

export default RecommendedPosts;
