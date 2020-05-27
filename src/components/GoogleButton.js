import React from "react";
import GoogleButton from "react-google-button";
import GoogleLogin from "react-google-login";

export function MyGoogleButton(props) {
  return (
    <GoogleLogin
      clientId="1019588126312-6ial6jichu6m3lvehv9r3ue1fnd7070v.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={props.handleResponseGoogle}
      onFailure={props.handleResponseGoogle}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <GoogleButton
          className={props.style}
          label="Continuar con Google"
          onClick={renderProps.onClick}
        ></GoogleButton>
      )}
    />
  );
}
