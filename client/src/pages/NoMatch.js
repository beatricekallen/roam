import React from "react";
import { useNavigate } from "react-router-dom";
import "./NoMatch.css";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="no-match">
        <h1>Oops!</h1>
        <h2>We couldn't find that page.</h2>
        <button size="small" onClick={() => navigate("/")}>
          Return To The Homepage
        </button>
      </div>
    </div>
  );
};

export default NoMatch;
