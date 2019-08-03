import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    buttonProgress: {
        color: blue[500]
    },
    root: {
        margin: '5em auto'
    }
}));

export default function LoadingAskqueInfo() {
    const classes = useStyles();
    const timer = React.useRef();

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    return (
        <div
            className={classes.root}
        >
            <CircularProgress size={68} className={classes.buttonProgress} />
        </div>
    );
}