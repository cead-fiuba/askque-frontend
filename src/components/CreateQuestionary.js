import React from 'react';
import TextField from '@material-ui/core/TextField';
import AppBar from "./AppBar"
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CreateQuestion from "./CreateQuestion";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import CssBaseline from '@material-ui/core/CssBaseline';
import VisilityIcon from '@material-ui/icons/Visibility';
import Hidden from '@material-ui/core/Hidden';
import { saveQuestionary } from '../service/TeacherService'


const ranges = [
  {
    value: 3,
    label: '3',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 10,
    label: '10',
  }
];


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
  slider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3)
  },
  sliderTitle: {
    marginLeft: theme.spacing(1)
  }, table: {
    minWidth: 650,
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  createQuestionButton: {
    marginTop: theme.spacing(5)
  },
  buttonsContainer: {
    marginTop: theme.spacing(10)
  },
  cancelButton: {
    marginRight: theme.spacing(2)
  }
}));


export default function CreateQuestionary(props) {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: '',
    multiline: 'Controlled',
    showCreateResponses: false,
    minutes: '3',
    open: false,
    module: '',
    questions: []
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function redirectTo(newPath) {
    props.history.push(newPath);
  }

  const saveQuestion = (question) => {
    const questions = values.questions
    questions.push(question)
    setValues({ ...values, questions: questions })
  }

  const save = () => {
    const questionaryToSave = {
      name: values.name,
      time: values.minutes,
      questions: values.questions.map((question) => ({
        text: question.question,
        options: question.options.map((option) => ({
          text: option.text,
          correct: option.isCorrect
        }))
      })),
      module: values.module
    }
    saveQuestionary(questionaryToSave).then((response) => {
      redirectTo('/my-askques')
    })

  }

  const cancelCreateQuestionary = () => {
    redirectTo('/my-askques')
  }

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="static"
      />
      <Typography component="div" variant="h4" style={{ margin: '5%' }}>
        <Box textAlign="center">
          NUEVA ENCUESTA
      </Box>
      </Typography>
      <Container maxWidth="md">


        <Grid container spacing={1} className={classes.rowResponse}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-full-width"
              label="Nombre de la Encuesta"
              style={{ width: '95%' }}
              margin="dense"
              variant="outlined"
              className={classes.textField}
              onChange={handleChange('name')}
              value={values.name}
            //fullWidth
            />
          </Grid>
          <Grid item xs={7} sm={6}>
            <TextField
              id="outlined-name"
              label="Modulo"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              style={{ width: '95%' }}
              onChange={handleChange('module')}
            />
          </Grid>
          <Grid item xs={5} sm={4}>
            <TextField
              select
              label="Tiempo"
              value={values.minutes}
              onChange={handleChange('minutes')}
              InputProps={{
                startAdornment: <InputAdornment position="start">Min</InputAdornment>,
              }}
              variant="outlined"
              className={classes.textField}
              margin="dense"
              helperText="Tiempo en minutos"
            >
              {ranges.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Table
          >
            <TableHead>
              <TableRow>
                <TableCell>Texto</TableCell>
                <Hidden only="xs">
                  <TableCell align="center">Nro de opciones</TableCell>
                </Hidden>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                values.questions.map((question, idx) => (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row">

                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {question.question.substring(0, 20) + '...'}
                      </Typography>
                    </TableCell>
                    <Hidden only="xs">
                      <TableCell align="center">
                        {question.options.length}
                      </TableCell>
                    </Hidden>
                    <TableCell align="center">
                      <CssBaseline />
                      <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                        color="primary"
                        variant="contained"
                      >
                        <Button>
                          <DeleteIcon className={classes.leftIcon} />
                          <Hidden only="xs">
                            Eliminar
                          </Hidden>
                        </Button>
                        <Button>
                          <EditIcon className={classes.leftIcon} />
                          <Hidden only="xs">
                            Editar
                          </Hidden>
                        </Button>
                        <Button>
                          <VisilityIcon className={classes.leftIcon} />
                          <Hidden only="xs">
                            Ver
                          </Hidden>
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>

          <Grid container spacing={1} className={classes.createQuestionButton}
            justify="flex-end"
            alignItems="center"
            direction="row"
          >
            <CreateQuestion
              saveQuestion={saveQuestion}
            />
          </Grid>
        </Grid>

        <Grid container
          justify="flex-end"
          alignItems="center"
          className={classes.buttonsContainer}
        >
          <Button
            variant="contained"
            className={classes.cancelButton}
            onClick={cancelCreateQuestionary}
          >
            Cancelar
        </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={save}
          >
            Guardar
        </Button>
        </Grid>



      </Container>
    </div>
  )
}