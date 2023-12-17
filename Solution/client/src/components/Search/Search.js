import React, { useEffect } from 'react';
import { CircularProgress, Grid, Grow, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import useStyles from './styles';
import SearchBar from './SearchBar/SearchBar';
import Post from '../Posts/Post/Post';
import Pagination from '../Pagination/Pagination';
import { getPostsBySearch } from '../../actions/search';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const query = useQuery();

    const searchQuery = query.get('search') || '';
    const tagsQuery = query.get('tags') !== undefined ? query.get('tags').split(',') : [];
    const pageQuery = query.get('page') || 1;

    console.log(searchQuery)
    console.log(tagsQuery)
    console.log(pageQuery)

    const { searchPosts, numberOfPages, isLoading } = useSelector((state) => state.search);


    const changePage = (e, p) => {
        if (p !== pageQuery)
            history.push(`/posts/search?search=${searchQuery}&tags=${tagsQuery.join(',')}&page=${p}`);
    }

    const search = (search, tags) => {
        if (search !== searchQuery || tags.join() !== tagsQuery.join()) {
            history.push(`/posts/search?search=${search}&tags=${tags.join(',')}&page=1`);
        }
    };

    useEffect(() => {
        dispatch(getPostsBySearch({ search: searchQuery, tags: tagsQuery }, pageQuery, history));
    }, [location]);

    return (
        <>
            <SearchBar tagsQuery={tagsQuery} searchQuery={searchQuery} searchPosts={search} showCancelButton={true} />
            {isLoading ?
                < Grid container className={classes.loadingIcon} justifyContent="center">
                    <CircularProgress />
                </Grid >
                :
                (searchPosts?.length ?
                    < Grow in>
                        <>
                            <Grid container className={classes.postsContainer} spacing={3}>
                                {searchPosts?.map((post) => (
                                    <Grid item key={post._id} xs={12} sm={9} md={6} lg={3}>
                                        <Post post={post} />
                                    </Grid>
                                ))}
                            </Grid>
                            <Pagination page={pageQuery} changePage={changePage} numberOfPages={numberOfPages} />
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

export default Search;
