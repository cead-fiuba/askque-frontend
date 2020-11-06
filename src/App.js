import React, { Component } from 'react';
import Root from "./components/Root"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppContextProvider } from '../src/context/context'
import CssBaseline from '@material-ui/core/CssBaseline';
import HttpsRedirect from 'react-https-redirect';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0CAAF3',
      contrastText: '#fff'
    },
    secondary: {
      main: '#95989A',
      light: '#DCDCDC'
    },
  },
});


class App extends Component {
  render() {
    return (
      <HttpsRedirect>
        <MuiThemeProvider theme={theme}>
          <AppContextProvider>
            <CssBaseline />
            <Root />
          </AppContextProvider>
        </MuiThemeProvider>
      </HttpsRedirect>
    );
  }
}

export default App;
