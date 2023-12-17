import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Container, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from '../styles';
import Input from '../../Input/Input';
import { updateUser } from '../../../actions/auth';

const initialState = { username: '', password: '', repeatPassword: '' };

const EditUser = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();

    const [userData, setUserData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const clear = () => {
        setUserData(initialState);
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setDisableButton(true);

        try {
            await dispatch(updateUser(id, userData, history));
        } catch (error) {
            setDisableButton(false);
        }
    }

    return (
        <Container maxWidth="xs">
            <Paper className={classes.paper}>
                <form className={classes.form}>
                    <Input value={userData.username} error={isSubmitted && userData.username.length < 2} name="username" helperText="Requirements: min/max 2/30 characters" label="Username" handleChange={handleChange} autoFocus fullWidth />
                    <Input value={userData.password} error={isSubmitted && userData.password.length > 0 && userData.password.length < 10} helperText="Requirements: min/max 10/50 characters" name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} fullWidth />
                    <Input value={userData.repeatPassword} error={isSubmitted && userData.password.length > 0 && userData.repeatPassword.length < 10} helperText="Requirements: min/max 10/50 characters" name="repeatPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} fullWidth />
                    <Button disabled={disableButton} variant="contained" color="primary" size="large" onClick={handleSubmit} fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                    <Button component={Link} to={id !== undefined ? `/users/${id}` : '/posts'} variant="contained" color="secondary" size="small" fullWidth>Cancel</Button>
                </form>
            </Paper >
        </Container>
    )
}

export default EditUser;
