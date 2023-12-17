import React from 'react';
import { Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import useStyles from './styles';

const Paginate = ({ page, changePage, numberOfPages }) => {

    const classes = useStyles();

    return (
        <Paper className={classes.pagination}>
            <Pagination
                classes={{ ul: classes.ul }}
                defaultPage={1}
                onChange={changePage}
                count={numberOfPages}
                page={Number(page) || 1}
                variant="outlined"
                color="primary"
            />
        </Paper>
    )
}

export default Paginate;