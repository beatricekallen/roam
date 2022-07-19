import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./NoMatch.css";

const NeedLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="no-match">
        <h1>Oops!</h1>
        <h2>You need to be logged in to see that page.</h2>
        <div className="margin">
          <Button
            className="button"
            size="small"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </div>
        <div>
          <Button
            className="button"
            size="small"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NeedLogin;
