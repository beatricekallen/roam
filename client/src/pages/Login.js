import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Navigate } from "react-router-dom";
import Input from "@mui/material/Input";
import Auth from "../utils/auth";
import "./Login.css";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });

    // navigate to profile once logged in
    return <Navigate to="/profile" />;
  };

  return (
    <main>
      <div className="container">
        <div className="signup">
          <h1>Log In</h1>
          <h2>Welcome back!</h2>
          <div>
            <form className="form" onSubmit={handleFormSubmit}>
              <Input
                className="form-input padding"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
                required={true}
                fullWidth={true}
              />
              <br></br>
              <Input
                className="form-input padding"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
                required={true}
                fullWidth={true}
              />
              <br></br>
              <button className="btn d-block w-100" type="submit">
                Log In
              </button>
            </form>

            {error && (
              <div>
                <h3>Login failed</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
