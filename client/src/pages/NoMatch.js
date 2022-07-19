import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./NoMatch.css";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="no-match">
        <h1>Oops!</h1>
        <h2>We couldn't find that page.</h2>
        <Button className="button" size="small" onClick={() => navigate("/")}>
          Return To The Homepage
        </Button>
      </div>
    </div>
  );
};

export default NoMatch;
