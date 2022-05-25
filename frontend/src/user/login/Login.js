import React, { useEffect } from "react";
import "./Login.css";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  JWT,
} from "../../constants";
import { login } from "../../util/APIUtils";
import { Link, Redirect } from "react-router-dom";
import fbLogo from "../../img/fb-logo.png";
import googleLogo from "../../img/google-logo.png";
import githubLogo from "../../img/github-logo.png";
import Alert from "react-s-alert";
import SocialLogin from "./SocialLogin";
import LoginForm from "./LoginForm";

function Login(props) {
  useEffect(() => {
    // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
    // Here we display the error and then remove the error query parameter from the location.
    if (props.location.state && props.location.state.error) {
      setTimeout(() => {
        Alert.error(props.location.state.error, {
          timeout: 5000,
        });
        props.history.replace({
          pathname: props.location.pathname,
          state: {},
        });
      }, 100);
    }
  }, []);

  if (props.authenticated) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: props.location },
        }}
      />
    );
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Login to SpringSocial</h1>
        <SocialLogin />
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <LoginForm {...props} />
        <span className="signup-link">
          New user? <Link to="/signup">Sign up!</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
