import React, { Component } from 'react';
import './App.css';
import Root from "./components/Root"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F5F5F5',
    },
    secondary: blue,
  },
});

class App extends Component {
  render() {
    return <MuiThemeProvider theme={theme}>
      <Root />
    </MuiThemeProvider>
  }
}

export default App;
