import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, IconButton, Menu, MenuItem, Avatar as MuiAvatar } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateRandomAvatarOptions } from '../../avatars/avatar';
import Avatar from 'avataaars';
import decoder from 'jwt-decode';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import useStyles from './styles';
import logo from '../../images/logo.png';
import { logout } from '../../actions/auth';

const Navbar = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const user = useSelector((state) => state.auth.user);

    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decoder(token);

            if (decodedToken.exp * 1000 < new Date().getTime())
                logoutUser();
        }
    }, [user, location]);

    const logoutUser = () => {
        dispatch(logout(history));
    }

    const handleMenuClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Toolbar component={Link} to="/" className={classes.heading} >
                <Typography className={classes.title} variant="h3" align="center">Pinastickle</Typography>
                <img className={classes.image} src={logo} alt="logo" height="30"></img>
            </Toolbar>
            <Toolbar className={classes.toolbar}>
                {user?.result ?
                    <>
                        {history.location.pathname !== '/posts/new' ?
                            <Button onClick={() => { history.push("/posts/new") }}><AddCircleIcon /></Button>
                            :
                            <Button onClick={() => { history.push("/") }}><KeyboardReturnIcon /></Button>
                        }
                        <div className={classes.profile}>
                            <IconButton onClick={handleMenuClick}>
                                {user?.result?.picture ?
                                    <MuiAvatar style={{ width: '50px', height: '50px' }} src={user.result.picture} />
                                    :
                                    <Avatar
                                        style={{ width: '50px', height: '50px' }}
                                        {...generateRandomAvatarOptions()} />
                                }
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose} anchorOrigin={{ vertical: 'top', horizontal: 'left', }} transformOrigin={{ vertical: 'top', horizontal: 'left', }}>
                                <MenuItem className={classes.button} onClick={handleMenuClose}><Button className={classes.button} variant="contained" color="primary" onClick={() => history.push(`/users/${user.result.sub || user.result._id}`)} ><AccountCircleIcon /><Typography>Account</Typography></Button></MenuItem>
                                <MenuItem className={classes.button} onClick={handleMenuClose}><Button className={classes.button} variant="contained" color="secondary" onClick={logoutUser}>Logout</Button></MenuItem>
                            </Menu>
                        </div>
                    </>
                    :
                    <Button component={Link} to="/auth"><AccountCircleIcon /></Button>
                }
            </Toolbar>
        </AppBar >
    )
}

export default Navbar;