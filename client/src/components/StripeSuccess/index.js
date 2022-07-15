//TODO: add functionality to button? or delete button if header is sufficient

// import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./index.css";

const StripeSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="stripe-success">
        <h1>Success!</h1>
        <h2>
          Thanks for your donation. Travelling sustainably and mindfully is good
          for you and for the planet.
        </h2>
        <button size="small" onClick={() => navigate("/profile")}>
          Return To Your Profile
        </button>
      </div>
    </div>
  );
};

export default StripeSuccess;
