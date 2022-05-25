import React, { useState } from "react";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  JWT,
} from "../../constants";

import { login } from "../../util/APIUtils";
import Alert from "react-s-alert";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleInputChange = (event) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;
    console.log(inputName + " inpuName Inside")
    if (inputName == "email") {
        console.log(inputName)
        setEmail(
            inputValue
    );

    }
    else {
        console.log(inputName)
        setPassword(inputValue)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)

    const loginRequest = Object.assign({}, {email,password});

    login(loginRequest)
      .then((response) => {
        console.log("itworked");
        console.log(response)
        localStorage.setItem(JWT, response.accessToken);
        Alert.success("You're successfully logged in!");
        props.loadCurrentlyLoggedInUser();
        // props.history.push("/");
      })
      .catch((error) => {
          console.log(error)
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
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
