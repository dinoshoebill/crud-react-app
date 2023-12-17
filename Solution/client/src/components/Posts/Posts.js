import React from 'react';
import { Grid, Grow, Paper, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import Post from './Post/Post';

const Posts = () => {

    const classes = useStyles();

    const { posts } = useSelector((state) => state.posts);

    if (!posts.length)
        return (
            <Paper className={classes.noPosts} >
                <Typography component="p">No posts</Typography>
            </Paper>
        )

    return (
        < Grow in>
            <Grid container className={classes.postsContainer} spacing={3}>
                {posts?.map((post) => (
                    <Grid item key={post._id} xs={12} sm={9} md={6} lg={3}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        </Grow >
    )
}

export default Posts;