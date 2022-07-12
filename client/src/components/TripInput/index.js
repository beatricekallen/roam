import { useState } from "react";

// import Input from "@mui/material/Input";
// import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { validateEmail } from "../../utils/helpers";

//TODO: use date pickers for dates? https://mui.com/x/react-date-pickers/getting-started/. verify that this form works

const TripInput = () => {
  const [formState, setFormState] = useState({
    name: "",
    location: "",
    dates: "",
    transportation: "",
    budget: "",
    friends: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const { name, location, dates, transportation, budget, friends } = formState;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorMessage) {
      setFormState({ [e.target.name]: e.target.value });
      console.log("Form", formState);
    }
    setFormState({ ...formState, [e.target.name]: "" });
  };

  const handleChange = (e) => {
    if (e.target.name === "friends") {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setErrorMessage("That email is invalid.");
      } else {
        setErrorMessage("");
      }
    } else {
      if (!e.target.value.length) {
        setErrorMessage(`This information is required.`);
      } else {
        setErrorMessage("");
      }
    }
    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <h2>Enter in your trip information.</h2>
      <form onSubmit={handleSubmit}>
        <h3>Enter a name for your trip.</h3>
        <TextField
          fullWidth
          label="fullWidth"
          name="name"
          onBlur={handleChange}
          defaultValue={name}
        />
        <h3>Where are you headed?</h3>
        <TextField
          fullWidth
          label="fullWidth"
          name="location"
          onBlur={handleChange}
          defaultValue={location}
        />
        <h3>When are you going?</h3>
        <TextField
          fullWidth
          label="fullWidth"
          name="dates"
          onBlur={handleChange}
          defaultValue={dates}
        />
        <h3>How are you getting there?</h3>
        <TextField
          fullWidth
          label="fullWidth"
          name="transportation"
          onBlur={handleChange}
          defaultValue={transportation}
        />
        <h3>What's your budget?</h3>
        <TextField
          fullWidth
          label="fullWidth"
          name="budget"
          onBlur={handleChange}
          defaultValue={budget}
        />
        <h3>Are friends joining? If so, enter their email addresses here.</h3>
        <TextField
          fullWidth
          label="fullWidth"
          name="friends"
          onBlur={handleChange}
          defaultValue={friends}
        />
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default TripInput;
