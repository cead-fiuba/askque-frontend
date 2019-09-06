import React, { Component } from 'react';
import Root from "./components/Root"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppContextProvider } from '../src/context/context'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0CAAF3',
      contrastText: 'white'
    },
    secondary: {
      main: '#95989A',
      light: '#DCDCDC'
    },
  },
});


class App extends Component {
  render() {
    return <MuiThemeProvider theme={theme}>
      <AppContextProvider>
        <Root />
      </AppContextProvider>
    </MuiThemeProvider>
  }
}

export default App;
