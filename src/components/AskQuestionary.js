import React, { Component } from 'react';
import '../style/style.scss'
import AppBar from "./AppBar"
import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
import LoadingAskqueInfo from './LoadingAskqueInfo'
import Grid from '@material-ui/core/Grid';
import AskqueResumen from './AskqueResume';

// const styles = makeStyles(theme => ({
//     header: {
//         marginTop: '1em'
//     }
// }));


export default class AskQuestionary extends Component {

    state = {
        value: '123',
        showLoading: false,
        showInformation: true,
        showResume: false
    }

    handleChange = (e) => {
        console.log(e.target.value)
        const wordLength = e.target.value.length
        const showLoading = wordLength === 3
        this.setState({ value: e.target.value.toUpperCase() })
        if (showLoading) {
            setTimeout(() => this.setState({ showInformation: false, showLoading }), 1000)
        }
        setTimeout(() => this.setState({ showResume: true, showInformation: false, showLoading: false }), 5000)
    }


    render() {
        return <>
            <AppBar
                position="static"
            />
            <main>
                <Typography variant="h4" align="center" color="textPrimary" gutterBottom style={{ marginTop: '1em' }}>
                    Ingrese la clave del ASKQUE
                </Typography>
            </main>
            <Grid container
                alignItems='center'
                justify='center'
            >
                {this.state.showLoading ? <>
                    <LoadingAskqueInfo />
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" align="center" color="textPrimary" gutterBottom style={{ marginTop: '1em' }}>
                            Obteniendo información del askque
                        </Typography>
                    </Grid>
                </> :
                    null
                }
                {this.state.showInformation ?
                    <input
                        type="text"
                        maxLength='3'
                        value={this.state.value}
                        onChange={this.handleChange}
                    /> : null}
                {this.state.showResume ? <div><AskqueResumen /></div> : null}
            </Grid>

        </>
    }

}