import React, { useEffect } from "react";
import { CircularProgress, Grid, Grow, Paper, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';


import useStyles from './styles';
import Pagination from '../Pagination/Pagination';
import Post from "../Posts/Post/Post";
import SearchBar from "../Search/SearchBar/SearchBar";
import { getPosts } from '../../actions/posts';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const query = useQuery();

    const page = query.get('page') || 1;

    const { posts, isLoading, numberOfPages } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPosts(page, history));
    }, [location]);

    const searchPosts = (search, tags) => {
        history.push(`/posts/search?search=${search}&tags=${tags.join(',')}&page=1`);
    };

    const changePage = (e, p) => {
        if (p !== page)
            history.push(`/posts?page=${p}`);
    }

    return (
        <>
            <SearchBar searchQuery={''} tagsQuery={[]} searchPosts={searchPosts} showCancelButton={false} />
            {isLoading ?
                < Grid container className={classes.loadingIcon} justifyContent="center">
                    <CircularProgress />
                </Grid >
                :
                (posts?.length ?
                    < Grow in>
                        <>
                            <Grid container className={classes.postsContainer} spacing={3}>
                                {posts?.map((post) => (
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
                )
            }
        </>
    )
}

export default Home;