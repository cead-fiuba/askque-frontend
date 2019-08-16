import React from 'react';

export const AppContext = React.createContext({});


export class AppContextProvider extends React.Component {

    state = {
        token: null,
        userLogged: true,
        userName: 'Cristian Gonzalez',
        changeIsLogged: this.changeIsLogged
    }

    changeIsLogged = () => {
        this.setState({ isLogged: true })
    }

    render() {
        return (
            <AppContext.Provider
                value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}


export const AppContextConsumer = AppContext.Consumer;