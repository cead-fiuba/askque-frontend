import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';

export default function ImageUpload() {

    const [state, setState] = React.useState({
        file: '',
        imagePreviewUrl: ''
    })

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
        }

        reader.readAsDataURL(file)
    }


    const imagePreviewUrl = state.imagePreviewUrl;
    let imagePreview = null;
    if (imagePreviewUrl) {
        imagePreview = (<img src={imagePreviewUrl} />);
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
                        <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            style={{ position: 'absolute', right: 125, marginTop: '1%' }}
                        >
                            <ImageIcon />
                        </Button>
                    </label>
                </form>
                <Grid container
                    justify="center"
                    alignItems="center"
                    direction="column"
                    style={{ height: '100%' }}
                >
                    <Grid item>
                        {imagePreview}
                    </Grid>
                </Grid>


            </Paper>
        </div>
    )
}
