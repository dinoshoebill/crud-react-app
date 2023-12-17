import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { generateRandomAvatarOptions } from '../../../../../avatars/avatar';
import Avatar from 'avataaars';
import moment from 'moment';

import useStyles from '../styles';

const Comment = ({ comment }) => {

    const classes = useStyles();

    return (
        <div className={classes.commentContainer} >
            <div className={classes.avatar}>
                <Avatar
                    style={{ width: '32px', height: '32px' }}
                    {...generateRandomAvatarOptions()} />
            </div>
            <div className={classes.comment}>
                <div className={classes.user}>
                    <Link href={`/users/${comment.creator}`} variant="body1" underline="hover">{comment.username}</Link>
                    <Typography variant="body2" color="textSecondary">{moment(comment.createdAt).fromNow()}</Typography>
                </div>

                <Typography variant="body1" component="p">{comment.comment}</Typography>
            </div>
        </div>
    )
}

export default Comment;
