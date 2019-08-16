import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AccountPlus, Login } from 'mdi-material-ui'
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden';
import { AppContextConsumer } from "../context/context"
import ExitToApp from '@material-ui/icons/ExitToAppRounded';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  rightButton: {
    marginLeft: theme.spacing(1)
  }
}));


export function AppBarCustom(props) {

  function redirectTo(newPath) {
    props.history.push(newPath);
  }

  const style = useStyles();

  return <div className={style.root}>
    <AppBar position={props.position}>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={style.grow}
          onClick={() => redirectTo("/")}
        >
          ASKQUE
          </Typography>
        <AppContextConsumer>
          {
            (value) => {
              return value.state.isLogged ?
                <>
                  <Button
                    variant="outlined"
                  >
                    Salir
                    <ExitToApp className={style.rightButton} />
                  </Button>
                </>
                :
                <>
                  <Button
                    onClick={() => redirectTo("/register")}
                    variant="outlined"
                    style={{ marginRight: '1%' }}
                  >
                    <Hidden only="xs">
                      Registrarse
                    </Hidden>
                    <AccountPlus className={style.rightButton} />
                  </Button>
                  <Button
                    onClick={() => { redirectTo("/login") }}
                    variant="outlined"
                  >
                    <Hidden only="xs">
                      Ingresar
                    </Hidden>
                    <Login className={style.rightButton} />

                  </Button>
                </>
            }
          }
        </AppContextConsumer>
      </Toolbar>
    </AppBar>
  </div>
}

export default withRouter(AppBarCustom)