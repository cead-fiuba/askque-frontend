import React, { useState, useEffect } from 'react';
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
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import { saveQuestionary } from '../service/TeacherService'
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Add';
import { uploadImage } from '../service/ImageUploaderService'
import AlertDialog from './common/AlertDialog'
import EditIcon from '@material-ui/icons/Edit';
import { deleteQuestion } from '../service/QuestionaryService'
import { useSnackbar, SnackbarProvider } from 'notistack';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

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

const NEW_RESPONSE_TEXT = "Nueva respuesta ..."

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
  }, rightIcon: {
    marginLeft: theme.spacing(1)
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


function CreateQuestionary2(props) {

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();


  const [values, setValues] = React.useState({
    name: props.asEdit ? props.questionary.name : '',
    showCreateResponses: false,
    minutes: '3',
    open: false,
    module: props.asEdit ? props.questionary.module : '',
    questions: props.asEdit ? props.questionary.questions : []
  });

  const [questionViewConfig, setQuestionViewConfig] = useState({ question: { text: '', options: [] }, showCreateQuestionForm: false })


  const [alertDialogValues, setAlertDialogValues] = useState({
    title: '',
    content: '',
    okButtonText: '',
    cancelButtonText: '',
    open: false,
    onOk: null,
    onCancel: null,
    loading: false
  })

  const [loadingAlertSave, setLoadingAlertSave] = useState(false)

  const [alertDialogValuesDelete, setAlertDialogValuesDelete] = useState({
    title: 'Eliminar pregunta',
    content: '¿Está seguro que desea eliminar la pregunta?',
    okButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
    open: false,
    onOk: null,
    onCancel: () => { setAlertDialogValuesDelete({ open: false }) },
    loading: false,
    questionIdxToDelete: null
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function redirectTo(newPath) {
    props.history.push(newPath);
  }

  const saveQuestion = (question) => {
    const questionToSave = {
      id: question.id,
      text: question.question,
      options: question.options,
      fileImage: question.fileImage
    }


    if (questionViewConfig.asEdit) {
      const mergedQuestions = questionViewConfig.asEdit && values.questions.reduce((arrayToPush, currentValue) => {
        console.log(`${currentValue.id} === ${questionToSave.id}`)
        if (currentValue.id === questionToSave.id) {
          arrayToPush.push(questionToSave)
        } else {
          arrayToPush.push(currentValue)
        }
        return arrayToPush
      }, []);
      setValues({ ...values, questions: mergedQuestions })
    } else {
      const questions = values.questions;
      questions.push(questionToSave)
      setValues({ ...values, questions: questions })
    }
  }

  /***
   * 
   * questionIdx es el idx dentro del array.
   * 
  */

  const handleDeleteQuestion = () => {
    console.log('deleting questions ....')
    if (props.asEdit) {
      console.log('It is edit mode')
      console.log('questions de los values', values.questions)
      const questions = values.questions;
      const questionIdxToDelete = alertDialogValuesDelete.questionIdxToDelete;
      const questionToDelete = questions[questionIdxToDelete]
      questions.splice(questionIdxToDelete);
      const deleteQuestionPromise = deleteQuestion(questionToDelete.id);
      setAlertDialogValuesDelete({ ...alertDialogValuesDelete, loading: true })
      deleteQuestionPromise.then((response) => {
        console.log('question deleted...')
        setValues({ ...values, questions: questions })
        setAlertDialogValuesDelete({ ...alertDialogValuesDelete, open: false })
        enqueueSnackbar('La pregunta fue eliminada', { variant: 'success' })
      })
    } else {
      console.log('It is not edit mode')
      const questions = values.questions;
      const questionIdxToDelete = alertDialogValuesDelete.questionIdxToDelete;
      questions.splice(questionIdxToDelete);
      setValues({ ...values, questions: questions })
      enqueueSnackbar('La pregunta fue eliminada', { variant: 'success' })
    }
  }

  const showCreateQuestionView = (value) => {
    setQuestionViewConfig({ ...questionViewConfig, showCreateQuestionForm: value })
  }

  const save = () => {
    console.log('set loading...', alertDialogValues)
    setLoadingAlertSave(true)
    const questionaryToSave = {
      hash: props.asEdit ? props.questionary.hash : null,
      name: values.name,
      time: values.minutes,
      module: values.module,
      is_new: props.asEdit ? false : true
    }
    const questions = values.questions.map(async (question) => {
      const questionToSend = {
        text: question.text,
        options: question.options.map((option) => ({
          text: option.text,
          correct: option.correct,
          id: option.id
        }))
      }
      if (question.id !== null && question.id !== undefined) {
        questionToSend.id = question.id
      }

      /** 
       * 
       * solo si debe guardar la imagen, devuelvo la pregunta
      */
      if (question.fileImage) {
        console.log('guardando imagenes ...', alertDialogValues)
        setAlertDialogValues({ ...alertDialogValues, content: 'Guardando imagenes ...' })
        const response = await uploadImage(question.fileImage);
        questionToSend.image_url = response.data.image_url;
        questionToSend.has_image = true;
      }
      return questionToSend;
    })

    Promise.all(questions).then((values) => {
      debugger;
      console.log('ya se guardaron las imagenes...', alertDialogValues)
      setAlertDialogValues({ ...alertDialogValues, content: 'Guardando preguntas ...' })
      questionaryToSave.questions = values;
      saveQuestionary(questionaryToSave).then((response) => {
        debugger;
        const newContent = <>Se creo el questionario <b>{response.data.hash}</b></>
        console.log('dasdasdas', alertDialogValues)
        setAlertDialogValues({ ...alertDialogValues, content: newContent })
        setTimeout(() => { redirectTo('/my-questionaries') }, 3000)
      })
    })


  }




  const cancelCreateQuestionary = () => {
    redirectTo('/my-questionaries')
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
              value={values.module}
            />
          </Grid>
          {/* <Grid item xs={5} sm={4}>
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
          </Grid> */}
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
                        {question.text.substring(0, 23) + '...'}
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
                        <Button
                          onClick={() => setAlertDialogValuesDelete({
                            ...alertDialogValuesDelete,
                            open: true,
                            questionIdxToDelete: idx
                          })}

                        >
                          <DeleteIcon className={classes.leftIcon} />
                          <Hidden only="xs">
                            Eliminar
                          </Hidden>
                        </Button>
                        <Button
                          onClick={() => {
                            setQuestionViewConfig({ question: question, showCreateQuestionForm: true, asEdit: true })
                          }}>
                          <EditIcon className={classes.leftIcon} />
                          <Hidden only="xs">
                            Editar
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

            <Fab color="primary"
              onClick={() => {
                setQuestionViewConfig({
                  question: {
                    text: '', options: [
                      {
                        text: NEW_RESPONSE_TEXT,
                        correct: false,
                        isNew: true
                      }]
                  },
                  showCreateQuestionForm: true,
                  asEdit: false
                })
              }}>
              <CreateIcon />
            </Fab>

            <CreateQuestion
              saveQuestion={saveQuestion}
              open={questionViewConfig.showCreateQuestionForm}
              handleClose={() => showCreateQuestionView(false)}
              question={questionViewConfig.question}
              asEdit={questionViewConfig.asEdit}
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
            onClick={() => {
              console.log('on click en save', alertDialogValues);
              setAlertDialogValues({
                ...alertDialogValues,
                title: 'Guardar cuestionario',
                content: '¿Desea guardar el cuestionario?',
                okButtonText: 'Sí, crear cuestionario',
                cancelButtonText: 'Cancelar',
                open: true,
                onCancel: () => { setAlertDialogValues({ open: false }) }
              })
              console.log('on click en save (2)', alertDialogValues);
            }}
          >

            CREAR
          </Button>
        </Grid>


        <AlertDialog
          open={alertDialogValues.open}
          title={alertDialogValues.title}
          content={alertDialogValues.content}
          handleOk={save}
          handleClose={alertDialogValues.onCancel}
          buttonTextOk={alertDialogValues.okButtonText}
          buttonTextCancel={alertDialogValues.cancelButtonText}
          loading={loadingAlertSave}
        />

        <AlertDialog
          open={alertDialogValuesDelete.open}
          title={alertDialogValuesDelete.title}
          content={alertDialogValuesDelete.content}
          handleOk={handleDeleteQuestion}
          handleClose={() => setAlertDialogValuesDelete({ ...alertDialogValuesDelete, open: false })}
          buttonTextOk={alertDialogValuesDelete.okButtonText}
          buttonTextCancel={alertDialogValuesDelete.cancelButtonText}
          loading={alertDialogValuesDelete.loading}
        />


      </Container>
    </div >
  )
}



export default function CreateQuestionary(props) {
  return (<SnackbarProvider maxSnack={3}>
    <CreateQuestionary2 {...props} />
  </SnackbarProvider>
  )
}