import React from 'react'
import GoogleButton from 'react-google-button'
import GoogleLogin from 'react-google-login'



export function MyGoogleButton(props) {
    return <GoogleLogin
        clientId="1019588126312-j8jtlv1q4a6djif45aumgnoao3m1mk12.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={props.handleResponseGoogle}
        onFailure={props.handleResponseGoogle}
        cookiePolicy={'single_host_origin'}
        render={renderProps => (
            <GoogleButton
                className={props.style}
                label='Continua con Google'
                onClick={renderProps.onClick}
            >
            </GoogleButton>
        )}
    />
}