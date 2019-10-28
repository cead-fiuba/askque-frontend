
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles, lighten } from '@material-ui/core/styles';

const CustomLinearProgress = withStyles({
    root: {
        height: 5,
        backgroundColor: lighten('#2196f3', 0.5),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#2196f3',
    },
})(LinearProgress);

export default CustomLinearProgress;