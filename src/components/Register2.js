import React, { useEffect } from "react";
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
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import DoneAllIcon from "@material-ui/icons/DoneAllRounded";

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

const emails = { 1: "@fi.uba.ar", 0: "@gmail.com" };
const asignatures = ["Fisica I", "Fisica II"];
const ocupations = ["Profesor", "Ayudante", "JTP"];

export default function Register() {
  const [userData, setUserData] = React.useState({
    name: null,
    lastname: null,
    rol: "",
    asignature: "",
    emailDomine: 1,
    emailUserName: null,
  });

  const [isComplete, setIsComplete] = React.useState();
  const [emailWasValidated, setEmailWasValidated] = React.useState(false);

  const handleChange = (name) => (event) => {
    setUserData({ ...userData, [name]: event.target.value });
  };

  useEffect(() => {
    checkIsComplete();
  }, [userData, emailWasValidated]);

  const checkIsComplete = () => {
    const nameIsOk = userData.name !== "" && userData.name !== null;
    const lastNameIsOk = userData.lastname !== "" && userData.lastname !== null;
    const rolIsOk = userData.rol !== "";
    const emailUserNameIsOk =
      userData.emailUserName !== null && userData.emailUserName !== "";
    const emailDomineIsOk =
      userData.emailDomine !== null && userData.emailDomine !== "";

    const basicValidationIsOk =
      nameIsOk &&
      lastNameIsOk &&
      rolIsOk &&
      emailUserNameIsOk &&
      emailDomineIsOk &&
      emailWasValidated;
    console.log("nameIsOK", nameIsOk);
    console.log("lastNameIsOk", lastNameIsOk);
    console.log("rolIsOk", rolIsOk);
    console.log("emailUserNameIsOk", emailUserNameIsOk);
    console.log("emailDomineIsOk", emailDomineIsOk);
    console.log("emailWasValidated", emailWasValidated);

    if (basicValidationIsOk) {
      if (userData.rol === 0) {
        console.log("estudiante");
        const padronIsOk =
          userData.padron !== "" &&
          userData.padron !== null &&
          userData.padron !== undefined;
        console.log("padron", userData.padron);
        setIsComplete(padronIsOk);
      } else if (userData.rol === 1) {
        const legajoIsOk =
          userData.legajo !== "" &&
          userData.legajo !== undefined &&
          userData.legajo !== null;
        const asignatureIsOk =
          userData.asignature !== null &&
          userData.asignature !== "" &&
          userData.asignature !== undefined;
        setIsComplete(legajoIsOk && asignatureIsOk);
      }
    }
  };

  const classes = useStyles();

  const loginCallback = (email) => {
    const currentEmail = userData.emailUserName + emails[userData.emailDomine];
    if (email === currentEmail) {
      console.log("email is ok");
      setEmailWasValidated(true);
    }
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
                      {ocupations.map((asignature, idx) => {
                        return (
                          <MenuItem value={idx} key={idx}>
                            {asignature}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={4} style={{ marginTop: "2%" }}>
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
                      {asignatures.map((asignature, idx) => {
                        return (
                          <MenuItem value={idx} key={idx}>
                            {asignature}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3} style={{ marginTop: "2%" }}>
                  <TextField
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
                      value={userData.emailDomine}
                      onChange={handleChange("emailDomine")}
                    >
                      <MenuItem value={1}>@fi.uba.ar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}></Grid>
                {userData.emailDomine !== "" &&
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
                                  emails[userData.emailDomine]}
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
                  />
                </Grid>
                <Grid item xs={2} style={{ marginTop: "2%" }}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userData.emailDomine}
                      onChange={handleChange("emailDomine")}
                      disabled={emailWasValidated}
                    >
                      <MenuItem value={0}>@gmail.com</MenuItem>
                      <MenuItem value={1}>@fi.uba.ar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}></Grid>
                {userData.emailDomine !== "" &&
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
                                  emails[userData.emailDomine]}
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
                onClick={() => {
                  console.log("cancel");
                }}
                color="primary"
              >
                Crear cuenta
              </Button>
            </Grid>
          )}
        </Paper>
      </Container>
    </div>
  );
}
