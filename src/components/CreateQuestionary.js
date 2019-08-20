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

const currencies = [
  {
    value: 'USD',
    label: 'Fisica I',
  },
  {
    value: 'EUR',
    label: 'Fisica II',
  },
  {
    value: 'BTC',
    label: 'Fisica III',
  },
  {
    value: 'JPY',
    label: 'Análisis Matemático II',
  },
];

const ranges = [
  {
    value: '3',
    label: '3',
  },
  {
    value: '5',
    label: '5',
  },
  {
    value: '7',
    label: '7',
  },
  {
    value: '10',
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
  }
}));


export default function CreateQuestionary() {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: '',
    multiline: 'Controlled',
    showCreateResponses: false,
    minutes: '3',
    open: false,
    module: '',
    questions: null
  });


  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <div>
      <AppBar
        position="static"
      />
      <Typography component="div" variant="h4" style={{ margin: '10px' }}>
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
          {/* <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-select-currency"
            select
            label="Materia"
            className={classes.textField}
            value={values.currency}
            onChange={handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            style={{ width: '95%' }}
            helperText="Seleccione la materia"
            margin="dense"
            variant="outlined"
          //fullWidth
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid> */}
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

          <Grid container spacing={1} className={classes.rowResponse}
            justify="center"
            alignItems="center"
            direction="row"
          >
            <CreateQuestion />
          </Grid>
          <Grid container>
            <Table
              style={{ width: '100%' }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Texto</TableCell>
                  <TableCell >Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>

        </Grid>
      </Container>
    </div>
  )
}