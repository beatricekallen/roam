import { useState } from "react";
import { ADD_TRIP } from "../utils/mutations";
import { QUERY_ME_BASIC } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { getFormattedDate } from "../utils/dateFormat";

// import Input from "@mui/material/Input";
// import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { validateEmail } from "../utils/helpers";
import Auth from "../utils/auth";

import "./CreateTrip.css";

const CreateTrip = () => {

  const [formState, setFormState] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    transportation: "",
    budget: "",
    friends: "",
  });

  const [addTrip, { error }] = useMutation(ADD_TRIP);

  const { loading, data } = useQuery(QUERY_ME_BASIC);

  console.log(data);

  const [errorMessage, setErrorMessage] = useState("");
  const { name, location, transportation, budget, friends } = formState;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errorMessage) {
      setFormState({ [e.target.name]: e.target.value });
      console.log("Form", formState);
    }

    // update db with trip info
    try {
      await addTrip({
        variables: {
          name: name,
          location: location,
          startDate: getFormattedDate(startValue),
          endDate: getFormattedDate(endValue),
          transportation: transportation,
          budget: budget,
          members: [friends],
        },
      });
    } catch (e) {
      console.error(e);
    }

    // setFormState({ ...formState, [e.target.name]: "" });
    console.log("done");

    return window.location.assign("/profile");
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

  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");

  function datePicker(type) {
    if (type === "startDate") {
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="mm/dd/yyyy"
            value={startValue}
            onChange={(newValue) => {
              setStartValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
    } else {
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="mm/dd/yyyy"
            value={endValue}
            onChange={(newValue) => {
              setEndValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
    }
  }

  return (
    <div className="create-trip-container">
      <div className="headings">
        <h1>Create a Trip</h1>
        <h2>Enter in your trip information.</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Enter a name for your trip.</h3>
        <TextField
          fullWidth
          label="Name"
          name="name"
          onBlur={handleChange}
          defaultValue={name}
        />
        <h3>Where are you headed?</h3>
        <TextField
          fullWidth
          label="Destination"
          name="location"
          onBlur={handleChange}
          defaultValue={location}
        />
        <h3>Pick a start date for your trip:</h3>
        {datePicker("startDate")}
        <h3>Pick an end date for your trip:</h3>
        {datePicker("endDate")}
        <h3>How are you getting there?</h3>
        <TextField
          fullWidth
          label="Transportation"
          name="transportation"
          onBlur={handleChange}
          defaultValue={transportation}
        />
        <h3>What's your budget?</h3>
        <TextField
          fullWidth
          label="Budget"
          name="budget"
          onBlur={handleChange}
          defaultValue={budget}
        />
        <h3>Are friends joining? If so, enter their email addresses here.</h3>
        <TextField
          fullWidth
          label="Friends"
          name="friends"
          onBlur={handleChange}
          defaultValue={friends}
        />
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <div className="headings">
          <button variant="contained" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
