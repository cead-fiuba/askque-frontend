import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { AppContextConsumer } from "../../context/context"

import 'typeface-roboto';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
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
    rightIcon: {
        marginLeft: theme.spacing(1),
    }
}));

export default function QuestionaryCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);


    function formatDate() {
        const date = new Date(props.questionary.date)
        var monthNames = [
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }


    return (
        <AppContextConsumer>
            {
                ({ state }) => {
                    console.log('state', state)
                    return <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Typography variant="h3">
                                    {props.questionary.hash}
                                </Typography>

                            }
                            title={props.questionary.name.slice(0, 25)}
                            subheader={formatDate()}
                            action={
                                <Tooltip title="Ver resultados" placement="right">
                                    <Button
                                        size="large"
                                        color="primary"
                                        variant="contained"
                                        style={{ 'display': 'block' }}
                                        onClick={() => { props.showQuestionaryResults() }}
                                    >
                                        <div> {props.questionary.quantity_respones}</div>
                                        <div><QuestionAnswerIcon /></div>
                                    </Button>
                                </Tooltip>

                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Cantidad de preguntas {props.questionary.questions.length}
                            </Typography>
                            {state.isAdmin && <Typography variant="overline" display="block">
                                BY {props.questionary.teacher_name != null ? props.questionary.teacher_name : "undefined"}
                            </Typography>}

                        </CardContent>
                        <CardActions disableSpacing={false}>
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={() => { props.deleteQuestionary() }}
                            >

                                Eliminar
                    <DeleteIcon className={classes.rightIcon} />
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={() => { props.editQuestionary() }}
                            >

                                Editar
                    <EditIcon className={classes.rightIcon} />
                            </Button>
                        </CardActions>
                    </Card>
                }
            }
        </AppContextConsumer>
    )
}
