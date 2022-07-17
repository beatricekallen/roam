import React from "react";
import { useNavigate } from "react-router-dom";
import "./NoMatch.css";

const NeedLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="no-match">
        <h1>Oops!</h1>
        <h2>You need to be logged in to see that page.</h2>
        <button size="small" onClick={() => navigate("/login")}>
          Log In
        </button>
        <button size="small" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default NeedLogin;
