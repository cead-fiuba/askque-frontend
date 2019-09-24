import React, { Component } from 'react';
import '../style/style.scss'
import AppBar from "./AppBar"
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AskqueResumen from './AskqueResume';
import { getInformationOfQuestionary } from '../service/StudentService'
import Button from '@material-ui/core/Button';
import CompleteQuestionary from "./CompleteQuestionary"

export default class AskQuestionary extends Component {

    state = {
        questionaryHash: '',
        showLoading: false,
        showInformation: true,
        showResume: false,
        questionaryName: null,
        questionaryModulo: null,
        startCompleteQuestionary: false,
        questionary: null
    }

    handleChange = (e) => {
        console.log(e.target.value)
        const hash = e.target.value.toUpperCase()
        const isComplete = hash.length === 3
        this.setState({ questionaryHash: hash })
        if (isComplete) {
            getInformationOfQuestionary(hash).then((response) => {
                console.log('response', response.data)
                this.setState(
                    {
                        showResume: true,
                        questionaryName: response.data.name,
                        questionaryModulo: response.data.module,
                        questionaryTime: response.data.time,
                        quantityQuestions: response.data.questions.length,
                        questionary: response.data
                    }
                )
            })
        }
    }


    startCompleteQuestionary = () => {
        this.setState({ showInformation: false, showResume: false, startCompleteQuestionary: true })
    }



    render() {
        return <>
            <AppBar
                position="static"
            />
            <Grid container
                alignItems='center'
                justify='center'
                style={{ marginTop: '10%' }}
            >
                {
                    this.state.showInformation ?
                        <Typography variant="h4" align="center" color="textPrimary" gutterBottom style={{ marginTop: '1em' }}>
                            Ingrese la clave del ASKQUE
                        </Typography> : null
                }


                <Grid item xs={12}>
                    {this.state.showInformation ?
                        <input
                            id="input-askque-code"
                            type="text"
                            maxLength='3'
                            value={this.state.questionaryHash}
                            onChange={this.handleChange}
                        /> : null}
                </Grid>
                <Grid container alignItems='center'
                    justify='center'>
                    {this.state.showResume ?
                        <>
                            <AskqueResumen
                                name={this.state.questionaryName}
                                module={this.state.questionaryModulo}
                                code={this.state.questionaryHash}
                                time={this.state.questionaryTime}
                                quantityQuestions={this.state.quantityQuestions}
                            />

                            <Typography variant="subtitle1" color="textSecondary">
                                Tenes {this.state.questionaryTime} minutos para responder {this.state.quantityQuestions} preguntas!
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                style={{ marginTop: '8px', marginBottom: '10px' }}
                                onClick={this.startCompleteQuestionary}
                            >
                                Estoy listo
                            </Button>
                        </>
                        :
                        null
                    }

                    {
                        this.state.startCompleteQuestionary ?
                            <CompleteQuestionary
                                hash={this.state.questionaryHash}
                                questionary={this.state.questionary}
                            /> : null
                    }

                </Grid>
            </Grid>

        </>
    }

}