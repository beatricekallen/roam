//TODO: add functionality to button? or delete button if header is sufficient

import Button from "@mui/material/Button";

const StripeSuccess = () => {
  return (
    <div>
      <h2>Success!</h2>
      <p>
        Thanks for your donation. Travelling sustainably and mindfully is good
        for you and for the planet.
      </p>
      <Button size="small">Return To Your Profile</Button>
    </div>
  );
};

export default StripeSuccess;
