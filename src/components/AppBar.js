import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AccountPlus, Login } from "mdi-material-ui";
import { makeStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import { AppContextConsumer } from "../context/context";
import ExitToApp from "@material-ui/icons/ExitToAppRounded";
import logo from "../images/logo.png";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "4%",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  rightButton: {
    marginLeft: theme.spacing(1),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  userEmailButton: {
    marginRight: theme.spacing(2),
  },
}));

function AppBarCustom(props) {
  function redirectTo(newPath) {
    props.history.push(newPath);
  }

  function exit() {
    props.context.logout();
    redirectTo("/");
  }

  const style = useStyles();

  return (
    <div className={style.root}>
      <AppBar position="fixed" className={style.appBar}>
        <Toolbar>
          <img
            src={logo}
            onClick={() => redirectTo("/")}
            alt="Logo"
            style={{ width: "35px", margin: "5px" }}
          />

          <Typography
            variant="h6"
            color="inherit"
            className={style.grow}
            onClick={() => redirectTo("/")}
            style={{ cursor: "pointer" }}
          >
            <Hidden only="xs">QuizFIUBA</Hidden>
          </Typography>

          {props.context.state.isLogged ? (
            <>
              <Button
                variant="text"
                color="inherit"
                className={style.userEmailButton}
              >
                {props.context.state.email.split("@")[0]}
                <PersonIcon className={style.rightButton} />
              </Button>

              <Button color="inherit" onClick={exit}>
                <Hidden only="xs">Salir</Hidden>
                <ExitToApp className={style.rightButton} />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => redirectTo("/register")}
                color="inherit"
                style={{ marginRight: "1%" }}
              >
                <Hidden only="xs">Registrarse</Hidden>
                <AccountPlus className={style.rightButton} />
              </Button>
              <Button
                onClick={() => {
                  redirectTo("/login");
                }}
                color="inherit"
              >
                <Hidden only="xs">Ingresar</Hidden>
                <Login className={style.rightButton} />
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter((props) => (
  <AppContextConsumer>
    {(contextData) => <AppBarCustom {...props} context={contextData} />}
  </AppContextConsumer>
));
