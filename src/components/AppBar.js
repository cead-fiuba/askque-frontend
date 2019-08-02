import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AccountPlus, Login } from 'mdi-material-ui'
import { withRouter } from 'react-router-dom';




const styles = {
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
};

class ButtonAppBar extends Component {

  state = {
    redirectToLogin: false,
    redirectToRegister: false
  }

  redirectTo = (newPath) => {
    this.props.history.push(newPath);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position={this.props.position}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}
              onClick={()=> this.redirectTo("/")}
            >
              Company Name
          </Typography>
            <Button onClick={() => this.redirectTo("/register")}>
              <AccountPlus />
            </Button>
            <Button onClick={() => { this.redirectTo("/login") }}>
              <Login />
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ButtonAppBar));