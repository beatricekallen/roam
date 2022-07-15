import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import Input from "@mui/material/Input";
import "./Signup.css";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="signup">
          <h1>Sign Up</h1>
          <h2>
            Ready to start planning your next trip with us? Enter in your
            information below.
          </h2>
          <div>
            <form className="form" onSubmit={handleFormSubmit}>
              <Input
                className="form-input padding"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
                required={true}
                fullWidth={true}
              />
              <br></br>
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
              <button type="submit">Sign Up</button>
            </form>

            {error && (
              <div>
                <h3>Signup failed</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
