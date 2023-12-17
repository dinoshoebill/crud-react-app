import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 48px',
        borderRadius: theme.spacing(3),
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    heading: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        fontSize: '24px',
        fontWeight: 'bolder',
    },
    image: {
        margin: theme.spacing(1),
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
        },
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            justifyContent: 'center',
        },
    },
    button: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
        },
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));