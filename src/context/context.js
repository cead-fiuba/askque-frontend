import React from 'react';

export const AppContext = React.createContext({});


export class AppContextProvider extends React.Component {

    state = {
        token: null,
        isLogged: false,
        userName: null
    }

    changeIsLogged = () => {
        this.setState({ isLogged: true })
    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    state: this.state,
                    changeIsLogged: this.changeIsLogged

                }}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}


export const AppContextConsumer = AppContext.Consumer;