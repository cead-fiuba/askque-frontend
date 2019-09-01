import React from 'react';

export const AppContext = React.createContext({});



console.log('localStorage.getItem(token)', localStorage.getItem('token') !== "null")
console.log('localStorage.getItem(token)', localStorage.getItem('token') !== null)
const tokenIsNull = localStorage.getItem('token') === null
const tokenIsNullString = localStorage.getItem('token') === "null"


console.log('Is logged', !tokenIsNull && !tokenIsNullString)

export class AppContextProvider extends React.Component {

    state = {
        token: localStorage.getItem('token'),
        isLogged: !tokenIsNull && !tokenIsNullString
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