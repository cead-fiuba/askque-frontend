import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    leftIcon: {
        marginRight: theme.spacing(1)
    }
}));


/*** 
 * okClick : function que se ejecuta en click
 * icon: icon del button
 * text: texto del boton
*/

export default function MyButton(props) {
    const style = styles()

    return <>
        {
            props.show && <Button
                variant="contained"
                color="primary"
                onClick={props.onClick}
                fullWidth={props.fullWidth}
                className={props.className}

            >
                <div className={style.leftIcon}>{props.leftIcon}</div>
                {props.text}
            </Button>
        }
    </>


}