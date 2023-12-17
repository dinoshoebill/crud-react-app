import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    mainContainer: {
        padding: '16px 32px',
        marginTop: theme.spacing(3),
        borderRadius: theme.spacing(3),
    },
    card: {
        display: 'flex',
        width: '100%',
        wordBreak: 'break-word',
        flexDirection: 'column',
        marginTop: theme.spacing(1),
    },
    section: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: theme.spacing(1),
    },
    postsSection: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: theme.spacing(1),
    },
    options: {
        width: '100%',
        display: 'flex',
        marginTop: theme.spacing(1),
    },
    actions: {
        display: 'flex',
        gap: theme.spacing(1),
    },
    loadingIcon: {
        marginTop: theme.spacing(1),
    },
    userPosts: {
        display: 'flex',
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
    },
}));