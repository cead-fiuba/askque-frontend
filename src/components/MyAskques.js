import React, { useState, useEffect } from 'react';
import AppBar from "./AppBar"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AskqueResume from "./AskqueResume"
import { getAskquesOfTeacher } from '../service/TeacherService'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    }
}));



export default function MyAskques() {
    const classes = useStyles();
    const [values, setState] = useState({
        questionaries: [],
        errorHappen: false
    })

    const getAskues = () => {
        getAskquesOfTeacher().then((res) => {
            setState({ ...values, questionaries: res.data.questionaries })
        }).catch((e) => {
            setState({ ...values, errorHappen: true })
        })
    }

    useEffect(() => {
        console.log('useEffect')
        getAskues()
    }, [])



    return <div>
        <AppBar
            position="static"
        />
        <div className={classes.root}>
            <Grid container>
                {
                    values.questionaries.map((questionary) => (
                        <AskqueResume
                            code='W58H'
                        />
                    ))
                }
            </Grid>
        </div>
    </div>
}
