import React from "react";
import GoogleLogin from "react-google-login";

export function MyGoogleButton(props) {
  const onSuccess = (response) => {
    console.log("response", response);
    props.callback(response.profileObj.email);
  };

  const onFailure = (response) => {};
  return (
    <GoogleLogin
      clientId="1019588126312-6ial6jichu6m3lvehv9r3ue1fnd7070v.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      style={{ width: "100% important!" }}
    >
      <span>Validar correo</span>
    </GoogleLogin>
  );
}
