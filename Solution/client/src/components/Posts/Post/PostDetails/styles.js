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
        gap: theme.spacing(1),
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        borderRadius: theme.spacing(3),
        marginTop: theme.spacing(1),
    },
    title: {
        fontWeight: 'bolder',
    },
    imageSection: {
        overflow: 'hidden',
        maxHeight: '480px',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.spacing(3),
    },
    recommendedPosts: {
        display: 'flex',
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: theme.spacing(3),
    },
    loadingIcon: {
        marginTop: theme.spacing(1),
    },
    switchView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    noPosts: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(1),
        borderRadius: theme.spacing(3),
    },
    commentSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
    },
    commentContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
    },
    avatar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignContent: 'center',
        gap: theme.spacing(1),
    },
    user: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        gap: theme.spacing(1),
    },
}));