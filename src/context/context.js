import React from 'react';

export const AppContext = React.createContext(
    {
        token: null,
        userLogged: false,
        userName: null,
        changeIsLogged: () => { }
    }
);


export class AppContextProvider extends React.Component {

    state = {
        isLogged: false
    }

    changeIsLogged = () => {
        this.setState({ isLogged: true })
    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    token: null,
                    userLogged: false,
                    userName: 'Cristian Gonzalez',
                    changeIsLogged: this.changeIsLogged
                }}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}


export const AppContextConsumer = AppContext.Consumer;