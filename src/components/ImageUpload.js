import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import Tooltip from '@material-ui/core/Tooltip';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    rightIcon: {
        marginLeft: theme.spacing(1)
    },
    uploadButton: {
        marginTop: theme.spacing(2)
    },
    imagePreviewContainer: {
        height: '100%'
    }
}))

export default function ImageUpload(props) {

    const [state, setState] = useState({
        file: '',
        imagePreviewUrl: ''
    })

    const [imageWasSelected, setImageWasSelect] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', state.file);
    }

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            setImageWasSelect(true)
            props.saveImage(file)
        }

        reader.readAsDataURL(file)
    }


    const imagePreviewUrl = state.imagePreviewUrl;
    let imagePreview = null;
    if (imagePreviewUrl || props.imageUrl) {
        let src;
        if (props.imageUrl) {
            src = props.imageUrl
        } else {
            src = imagePreviewUrl
        }
        imagePreview = (<img src={src} alt="" style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }} />);
    } else {
        imagePreview = (
            <>
                <Typography variant="h2" gutterBottom>Por favor seleccione una imagen</Typography>
                <Typography variant="h3" gutterBottom>
                    Tamaño máximo 1200x400 pixeles
                </Typography>
            </>
        );
    }

    const classes = useStyles()

    return (
        <div>

            <Paper style={{ width: '100%', height: '400px', overflow: 'hidden', textAlign: 'center' }}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        onChange={(e) => handleImageChange(e)}
                        multiple
                        type="file"
                    />
                    <label htmlFor="raised-button-file">
                        <Tooltip title="Subir imagen desde la computadora">
                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                style={{ position: 'absolute', right: 125, marginTop: '1%' }}
                            >
                                <ImageIcon />
                            </Button>
                        </Tooltip>
                    </label>
                </form>
                <Grid container
                    justify="center"
                    alignItems="center"
                    direction="column"
                    className={classes.imagePreviewContainer}
                >
                    <Grid item>
                        {imagePreview}
                    </Grid>
                </Grid>
            </Paper>
        </div >
    )
}
