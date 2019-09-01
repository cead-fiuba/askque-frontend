import React, { Component } from 'react';
import Root from "./components/Root"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { AppContextProvider } from '../src/context/context'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F5F5F5',
    },
    secondary: blue,
  },
});

//primary #0CAAF3
//secondary #DCDCDC

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
