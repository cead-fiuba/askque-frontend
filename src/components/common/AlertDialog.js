import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


/***
 * 
 * props
 * 
 * open
 * handleCancel
 * handleOk
 * title: Titulo de AlertDialog
 * content: Contenido, texto del dialogo
 * 
 * buttonTextOk
 * buttonTextCancel
*/

export default function AlertDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        {props.buttonTextCancel}
                    </Button>
                    <Button onClick={props.handleOk} color="primary" autoFocus>
                        {props.buttonTextOk}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}