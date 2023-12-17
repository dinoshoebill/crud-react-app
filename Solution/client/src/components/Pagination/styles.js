import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    pagination: {
        borderRadius: theme.spacing(3),
        marginTop: theme.spacing(1),
        padding: theme.spacing(1),
    },
    ul: {
        justifyContent: 'space-around',
    },
}));