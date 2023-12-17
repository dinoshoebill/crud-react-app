import React, { useState } from 'react';
import { AppBar, Button, Grid, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import useStyles from '../styles';

const SearchBar = ({ searchQuery, tagsQuery, searchPosts, showCancelButton }) => {

    const classes = useStyles();
    const history = useHistory();

    const [search, setSearch] = useState(searchQuery);
    const [tags, setTags] = useState(tagsQuery);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPosts(search, tags);
        }
    };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    const backToPosts = () => {
        history.push("/posts");
    }

    return (
        <AppBar className={classes.appBarSearch} position="static" color="inherit">
            <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
            <ChipInput
                style={{ margin: '8px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
            />
            <Grid container spacing={1} align="center" justifyContent="flex-end" direction="row">
                {showCancelButton &&
                    <Grid item >
                        <Button onClick={backToPosts} variant="contained" color="secondary">Cancel Search</Button>
                    </Grid>
                }
                <Grid item >
                    <Button onClick={() => searchPosts(search, tags)} variant="contained" color="primary">Search</Button>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default SearchBar;
