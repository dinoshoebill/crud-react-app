import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    mainContainer: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(1),
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
    },
    fileInput: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    loadingIcon: {
        marginTop: theme.spacing(1),
    }
}));