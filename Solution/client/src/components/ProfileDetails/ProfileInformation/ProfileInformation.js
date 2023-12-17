import React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import useStyles from '../styles';
import { deleteUser } from '../../../actions/auth';


const ProfileInformation = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const isGoogle = user?.token?.length > 500;

    const { userInfo } = useSelector((state) => state.user);

    const handleDelete = () => {
        dispatch(deleteUser(id, history));
    }

    const handleEdit = () => {
        history.push(`/users/${id}/edit`);
    }

    return (
        <Paper className={classes.mainContainer}>
            <div className={classes.options}>
                {(user?.result?.sub === id || user?.result?._id === id) ?
                    !isGoogle ?
                        <div className={classes.actions}>
                            <Button color="primary" variant="outlined" onClick={handleEdit}><MoreHorizIcon fontSize="medium" /></Button>
                            <Button color="secondary" variant="outlined" onClick={() => handleDelete(id)}><DeleteIcon fontSize="small" /> Delete</Button>
                        </div>
                        :
                        <div className={classes.actions}>
                            <a href="https://www.google.com/account/about/">
                                <Button color="primary" variant="contained">Google Account</Button>
                            </a>
                        </div>
                    :
                    null
                }
            </div>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h4">Account information</Typography>
                    {userInfo?.email && (
                        <>
                            <Typography variant="h6">Email:</Typography>
                            <Typography variant="h5" style={{ fontWeight: 'bolder' }}>{userInfo.email}</Typography>
                        </>
                    )}
                    {userInfo?.username && (
                        <>
                            <Typography variant="h6">Username:</Typography>
                            <Typography variant="h5" style={{ fontWeight: 'bolder' }}>{userInfo.username}</Typography>
                        </>
                    )}
                </div>
            </div>
        </Paper>
    )
}

export default ProfileInformation;
