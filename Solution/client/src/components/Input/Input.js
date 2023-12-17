import React from 'react';
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ value, name, handleChange, helperText, error, label, type, required, half, fullWidth, autoFocus, handleShowPassword, multiline, minRows }) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            value={value}
            name={name}
            onChange={handleChange}
            helperText={helperText}
            error={error}
            type={type}
            label={label}
            variant="outlined"
            required={required}
            fullWidth={fullWidth}
            autoFocus={autoFocus}
            multiline={multiline}
            minRows={minRows}
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            } : null}
        />
    </Grid>
)

export default Input;