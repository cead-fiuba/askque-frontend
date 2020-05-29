import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { MyGoogleButton } from "./GoogleButton";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box boxShadow={3}>
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{ width: "100%" }}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    minWidth: "100%",
  },
  googleButton: {
    width: "100% !important",
  },
}));

export default function Register() {
  //const classes = useStyles();
  const [rol, setRol] = React.useState("");

  const [userData, setUserData] = React.useState({
    name: null,
    lastname: null,
    rol: "",
    asignature: "",
  });

  const handleChange = (name) => (event) => {
    console.log("name" + name + "event" + event.target.value);
    setUserData({ ...userData, [name]: event.target.value });
  };

  const classes = useStyles();

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    const personalInformation = response.profileObj;
    const email = personalInformation.email;
    console.log("email", email);
  };

  return (
    <div>
      <Container component="main" maxWidth="md" style={{ marginTop: "3%" }}>
        <Box fontSize="h5.fontSize" fontWeight="fontWeightBold" m={1}>
          Crear cuenta
        </Box>
        <Paper square style={{ padding: "5%" }}>
          <Grid container>
            <Grid item xs={5} style={{ marginTop: "2%" }}>
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                onChange={handleChange("name")}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={5} style={{ marginTop: "2%" }}>
              <TextField
                id="outlined-basic"
                label="Apellido"
                variant="outlined"
                onChange={handleChange("lastname")}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={5} style={{ marginTop: "2%" }}>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="demo-simple-select-label">Rol</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userData.rol}
                  onChange={handleChange("rol")}
                  label="Ingresar"
                >
                  <MenuItem value={0}>Alumno</MenuItem>
                  <MenuItem value={1}>Docente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={7} />
          </Grid>

          {userData.rol === 1 && (
            <>
              <Grid container>
                <Grid item xs={5} style={{ marginTop: "2%" }}>
                  <TextField
                    id="outlined-basic"
                    label="Legajo"
                    variant="outlined"
                    onChange={handleChange("lastname")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={5} style={{ marginTop: "2%" }}>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel id="demo-simple-select-label">
                      Materia
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userData.asignature}
                      onChange={handleChange("asignature")}
                      label="Ingresar"
                    >
                      <MenuItem value={0}>FISICA I</MenuItem>
                      <MenuItem value={1}>FISICA II</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3} style={{ marginTop: "2%" }}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange("email")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2} style={{ marginTop: "2%" }}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userData.asignature}
                      onChange={handleChange("asignature")}
                    >
                      <MenuItem value={0}>@gmail.com</MenuItem>
                      <MenuItem value={1}>@fi.uba.ar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={5} style={{ marginTop: "2%" }}>
                  <MyGoogleButton
                    handleResponseGoogle={responseGoogle}
                    style={classes.googleButton}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}
