import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { MyGoogleButton } from "./GoogleButton";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import DoneAllIcon from "@material-ui/icons/DoneAllRounded";
import Divider from "@material-ui/core/Divider";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { isEmpty } from "../util/StringUtil";
import { createStudent } from "../service/StudentService";
import { createTeacher } from "../service/TeacherService";
import { AppContextConsumer } from "../context/context";
import { withRouter } from "react-router-dom";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const emailDomains = { 1: "@fi.uba.ar", 0: "@gmail.com" };
const ocupations = ["Profesor", "Ayudante", "JTP"];

function Register(props) {
  const [userData, setUserData] = React.useState({
    name: null,
    lastname: null,
    rol: "",
    asignature: "",
    emailDomain: "",
    emailUserName: null,
    ocupation: "",
  });

  const [isComplete, setIsComplete] = React.useState();
  const [emailWasValidated, setEmailWasValidated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [emailFieldInfo, setEmailFieldInfo] = React.useState({
    isValid: true,
    helperText: null,
  });

  const handleChange = (name) => (event) => {
    setUserData({ ...userData, [name]: event.target.value });
  };

  useEffect(() => {
    checkIsComplete();
  }, [userData, emailWasValidated]);

  const checkIsComplete = () => {
    const nameIsOk = !isEmpty(userData.name);
    const lastNameIsOk = !isEmpty(userData.lastname);
    const rolIsOk = userData.rol !== "";
    const emailUserNameIsOk = !isEmpty(userData.emailUserName);
    const emailDomainIsOk = !isEmpty(userData.emailDomain);

    const basicValidationIsOk =
      nameIsOk &&
      lastNameIsOk &&
      rolIsOk &&
      emailUserNameIsOk &&
      emailDomainIsOk &&
      emailWasValidated;

    if (basicValidationIsOk) {
      if (userData.rol === 0) {
        const padronIsOk = !isEmpty(userData.padron);
        setIsComplete(padronIsOk);
      } else if (userData.rol === 1) {
        const legajoIsOk = !isEmpty(userData.legajo);
        const asignatureIsOk = !isEmpty(userData.asignature);
        setIsComplete(legajoIsOk && asignatureIsOk);
      }
    }
  };

  const goTo = (value) => {
    props.history.push(value);
  };

  const loginCallback = (email) => {
    const currentEmail = userData.emailUserName + emailDomains[userData.emailDomain];
    if (email === currentEmail) {
      console.log("email is ok");
      setEmailWasValidated(true);
    }
  };

  const save = () => {
    setLoading(true);
    const email = userData.emailUserName + emailDomains[userData.emailDomain];
    var promise;
    if (userData.rol === 0) {
      const request = {
        name: userData.name,
        lastname: userData.lastname,
        padron: userData.padron,
        email: email,
      };
      promise = createStudent(request);
    } else {
      const request = {
        legajo: userData.legajo,
        name: userData.name,
        lastname: userData.lastname,
        email: email,
        ocupation: userData.ocupation,
      };
      promise = createTeacher(request);
    }
    promise
      .then((res) => {
        props.context.setToken(res.data.token);
        props.context.setEmail(email);
        setTimeout(() => {
          setLoading(false);
          setShowDialog(true);
        }, 2000);
      })
      .catch((reason) => {
        console.log("reason", reason.message);
        setLoading(false);
        setEmailFieldInfo({
          isValid: false,
          helperText: "Ya existe usuario con este email",
        });
        setEmailWasValidated(false);
      });
  };

  const classes = useStyles();

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
                required
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
                required
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
                  required
                >
                  <MenuItem value={0}>Alumno</MenuItem>
                  <MenuItem value={1}>Docente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={7} />
          </Grid>

          <Divider light style={{ marginTop: "2%" }} />

          {userData.rol === 1 && (
            <>
              <Grid container>
                <Grid item xs={2} style={{ marginTop: "2%" }}>
                  <TextField
                    id="outlined-basic"
                    label="Legajo"
                    variant="outlined"
                    onChange={handleChange("legajo")}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={4} style={{ marginTop: "2%" }}>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                  >
                    <InputLabel id="demo-simple-select-label">Cargo</InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userData.ocupation}
                      onChange={handleChange("ocupation")}
                      label="Ingresar"
                    >
                      {ocupations.map((ocupation, idx) => {
                        return (
                          <MenuItem value={idx} key={idx}>
                            {ocupation}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={4} style={{ marginTop: "2%" }}>
                  <TextField
                    id="outlined-basic"
                    label="Codigo Materia (XX.XX)"
                    variant="outlined"
                    onChange={handleChange("asignature")}
                    fullWidth
                    inputProps={{ maxLength: 5 }}
                    required
                  />
                </Grid>
                <Grid item xs={3} style={{ marginTop: "2%" }}>
                  <TextField
                    error={!emailFieldInfo.isValid}
                    helperText={emailFieldInfo.helperText}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange("emailUserName")}
                    fullWidth
                    required
                    disabled={emailWasValidated}
                  />
                </Grid>
                <Grid item xs={2} style={{ marginTop: "2%" }}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userData.emailDomain}
                      onChange={handleChange("emailDomain")}
                    >
                      <MenuItem value={1}>@fi.uba.ar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}></Grid>
                {userData.emailDomain !== "" &&
                  userData.emailUserName !== null && (
                    <>
                      {emailWasValidated ? (
                        <>
                          <Grid
                            item
                            xs={5}
                            style={{ marginTop: "3%", color: "green" }}
                          >
                            <DoneAllIcon fontSize="large"></DoneAllIcon> Email
                            validado!{" "}
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid item xs={5} style={{ marginTop: "2%" }}>
                            <MyGoogleButton callback={loginCallback} />
                          </Grid>
                          <Grid item xs={6}></Grid>
                          <Grid item xs={6}>
                            <InfoIcon></InfoIcon>
                            <Typography
                              variant="caption"
                              display="initial"
                              gutterBottom
                            >
                              IMPORTANTE: Al hacer click en el "Validar correo"
                              aparecera una ventana emergente con tus cuentas de
                              google disponibles, asegurate de elegir{" "}
                              <b>
                                {userData.emailUserName +
                                  emailDomains[userData.emailDomain]}
                              </b>
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </>
                  )}
              </Grid>
            </>
          )}
          {userData.rol === 0 && (
            <>
              <Grid container>
                <Grid item xs={5} style={{ marginTop: "2%" }}>
                  <TextField
                    id="outlined-basic"
                    label="Padron"
                    variant="outlined"
                    onChange={handleChange("padron")}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={7} />
                <Grid item xs={3} style={{ marginTop: "2%" }}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange("emailUserName")}
                    fullWidth
                    required
                    disabled={emailWasValidated}
                    error={!emailFieldInfo.isValid}
                    helperText={emailFieldInfo.helperText}
                  />
                </Grid>
                <Grid item xs={2} style={{ marginTop: "2%" }}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userData.emailDomain}
                      onChange={handleChange("emailDomain")}
                      disabled={emailWasValidated}
                    >
                      <MenuItem value={0}>@gmail.com</MenuItem>
                      <MenuItem value={1}>@fi.uba.ar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}></Grid>
                {userData.emailDomain !== "" &&
                  userData.emailUserName !== null &&
                  userData.emailUserName !== "" && (
                    <>
                      {emailWasValidated ? (
                        <>
                          <Grid
                            item
                            xs={5}
                            style={{ marginTop: "3%", color: "green" }}
                          >
                            <DoneAllIcon fontSize="large"></DoneAllIcon> Email
                            validado!{" "}
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid item xs={5} style={{ marginTop: "2%" }}>
                            <MyGoogleButton callback={loginCallback} />
                          </Grid>
                          <Grid item xs={6}></Grid>
                          <Grid item xs={6}>
                            <InfoIcon></InfoIcon>
                            <Typography
                              variant="caption"
                              display="initial"
                              gutterBottom
                            >
                              IMPORTANTE: Al hacer click en el "Validar correo"
                              aparecera una venta emergente con tus cuentas de
                              google disponibles, asegurate de elegir{" "}
                              <b>
                                {userData.emailUserName +
                                  emailDomains[userData.emailDomain]}
                              </b>
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </>
                  )}
              </Grid>
            </>
          )}

          {isComplete && (
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="center"
              style={{ marginTop: "3%" }}
            >
              <Button
                variant="contained"
                className={classes.cancelButton}
                onClick={save}
                color="primary"
              >
                Crear cuenta
              </Button>
            </Grid>
          )}
        </Paper>
      </Container>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={showDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Creación de cuenta exitosa"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <>
              Usted acaba de crear una cuenta como{" "}
              <b>{userData.rol === 0 ? "alumno" : "docente"}</b>. Esto significa
              que solo puede <>{userData.rol === 0 ? "responder" : "crear"}</>{" "}
              cuestionarios
            </>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (userData.rol === 0) {
                goTo("/ask-questionary");
              } else {
                goTo("/my-questionaries");
              }
            }}
            color="primary"
            autoFocus
          >
            {userData.rol === 0 ? "Response cuestionario" : "Mis cuestionarios"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter((props) => (
  <AppContextConsumer>
    {(contextData) => <Register {...props} context={contextData} />}
  </AppContextConsumer>
));
