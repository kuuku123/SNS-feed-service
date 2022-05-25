import React, { useState } from "react";
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


const SignupForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    if (inputName == "name") {
        setName(inputValue)
    }
    else if(inputName == "email") {
        setEmail(inputValue)
    }
    else {
        setPassword(inputValue)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const signUpRequest = Object.assign({}, {name,email,password});

    signup(signUpRequest)
      .then((response) => {
        Alert.success(
          "You're successfully registered. Please login to continue!"
        );
        props.history.push("/login");
      })
      .catch((error) => {
        Alert.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
