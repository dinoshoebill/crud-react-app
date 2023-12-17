import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import decoder from 'jwt-decode';

import useStyles from './styles';
import Input from '../Input/Input';
import { toast } from 'react-toastify';
import { login, signUp } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';

const initialState = { username: '', email: '', password: '', repeatPassword: '' };

const Auth = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [userData, setForm] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setDisableButton(true);

        try {
            if (isSignUp) {
                await dispatch(signUp(userData, history));
            } else {
                await dispatch(login(userData, history));
            }
        } catch (error) {
            setDisableButton(true);
        }
    }

    const handleChange = (e) => {
        setForm({ ...userData, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const switchMode = () => {
        setIsSubmitted(false);
        setForm(initialState);
        setShowPassword(false);
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setDisableButton(false);
    };

    const googleSuccess = (res) => {

        const result = decoder(res?.credential);
        const token = res?.credential;

        try {
            dispatch({ type: AUTH, payload: { result, token } });

            toast.success("You successfully logged in", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            history.push("/posts");
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        toast.error("Google Sign In was unsuccessful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return (
        <Container maxWidth="xs">
            <Paper className={classes.mainContainer}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign up' : 'Login'}</Typography>
                <form noValidate className={classes.form} onSubmit={handleSubmit}>
                    {isSignUp && (
                        <>
                            <Input value={userData.username} error={isSubmitted && (userData.username.length < 2 || userData.username.length > 30)} helperText="Requirements: min/max 2/30 characters" name="username" label="Username" handleChange={handleChange} autoFocus required fullWidth />
                        </>
                    )}

                    <Input value={userData.email} error={isSubmitted && (userData.email.length > 100 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email))} helperText={isSignUp ? "Requirements: valid email, maximum 80 characters" : null} name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus required fullWidth />
                    <Input value={userData.password} error={isSubmitted && (userData.password.length < 10 || userData.password.length > 50)} helperText={isSignUp ? "Requirements: min/max 10/50 characters" : null} name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} required fullWidth />
                    {isSignUp && <Input value={userData.repeatPassword} error={isSubmitted && (userData.repeatPassword.length < 10 || userData.repeatPassword.length > 50)} helperText="Requirements: min/max 10/50 characters" name="repeatPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} required fullWidth />}
                    <Button disabled={disableButton} type="submit" variant="contained" color="primary">
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </Button>
                    <Grid container justifyContent="center">
                        <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Typography component="p">
                            {isSignUp ? "Already have an account? " : "Don't have an account? "}
                            <Button color="primary" onClick={switchMode}>
                                {isSignUp ? "Sign in" : "Sign Up"}
                            </Button>
                        </Typography>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
