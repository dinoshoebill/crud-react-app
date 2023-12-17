import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid } from '@material-ui/core/';
import CreateIcon from '@material-ui/icons/Create';
import moment from 'moment';

import useStyles from '../styles';

const Post = ({ post }) => {

    const classes = useStyles();

    const history = useHistory();

    return (
        <Grid onClick={() => history.push(`/posts/${post._id}`)} item >
            <Card className={classes.card} >
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <CardContent className={classes.overlay1}>
                    <Typography variant="h6">{post.username}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </CardContent>
                <CardContent className={classes.overlay2}>
                    <CreateIcon style={{ width: '50px', height: '50px' }} />
                </CardContent>
                <CardContent>
                    <Typography noWrap={true} variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </CardContent>
                <CardContent>
                    <Typography noWrap={true} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                </CardContent>
                <CardContent>
                    <Typography noWrap={true} variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                <CardContent className={classes.likes}>
                    <Typography variant="body2" color="textSecondary" component="p">{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</Typography>
                </CardContent>
            </Card >
        </Grid>
    )
}

export default Post;