import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import prettyFormatDate from '../util/PrettyFormatDate'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        marginBottom: theme.spacing(3)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function ResponseCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Typography variant="h3">
                        {props.answer.questionary.hash}
                    </Typography>

                }
                title={props.answer.questionary.name}
                subheader={"Creado por " + props.answer.questionary.teacher_name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Respondido {prettyFormatDate(new Date(props.answer.date))}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>
        </Card>
    );
}
