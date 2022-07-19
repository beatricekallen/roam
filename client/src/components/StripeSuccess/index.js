// import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
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
        <Button
          className="button"
          size="small"
          onClick={() => navigate("/profile")}
        >
          Return To Your Profile
        </Button>
      </div>
    </div>
  );
};

export default StripeSuccess;
