import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    postsContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(1),
    },
    noPosts: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(1),
        borderRadius: theme.spacing(3),
    },
    loadingIcon: {
        justifyContent: 'center',
        marginTop: theme.spacing(1),
    },
    media: {
        height: 0,
        paddingTop: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: theme.spacing(3),
    },
    overlay1: {
        position: 'absolute',
        color: 'white',
        top: theme.spacing(1),
        left: theme.spacing(1),
    },
    overlay2: {
        position: 'absolute',
        top: -theme.spacing(3),
        right: -theme.spacing(3),
        zIndex: 100,
    },
}));