import React from 'react';

export const AppContext = React.createContext({});





export class AppContextProvider extends React.Component {

    state = {
        token: localStorage.getItem('token'),
        isLogged: localStorage.getItem('token') !== "null",
    }

    setToken = (token) => {
        this.setState({ token, isLogged: token !== null }, () => { localStorage.setItem('token', token) })

    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    state: this.state,
                    setToken: this.setToken

                }}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}


export const AppContextConsumer = AppContext.Consumer;