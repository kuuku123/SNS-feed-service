import React, { Component } from "react";
import "./Signup.css";
import { Link, Redirect } from "react-router-dom";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
} from "../../constants";
import { signup } from "../../util/APIUtils";
import fbLogo from "../../img/fb-logo.png";
import googleLogo from "../../img/google-logo.png";
import githubLogo from "../../img/github-logo.png";
import Alert from "react-s-alert";
import SocialSignup from "./SocialSignup";
import SignupForm from "./SignupForm";

function Signup(props) {
  if (props.authenticated) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: this.props.location },
        }}
      />
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-title">Signup with SpringSocial</h1>
        <SocialSignup />
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <SignupForm {...props} />
        <span className="login-link">
          Already have an account? <Link to="/login">Login!</Link>
        </span>
      </div>
    </div>
  );
}

export default Signup;
