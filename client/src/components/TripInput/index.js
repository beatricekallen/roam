import { useState } from "react";

// import Input from "@mui/material/Input";
// import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { validateEmail } from "../../utils/helpers";

//TODO: use date pickers for dates? https://mui.com/x/react-date-pickers/getting-started/. verify that this form works

const TripInput = () => {
  const [formState, setFormState] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
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

  const handleDateChange = (value, type) => {
    if (type === "startDate") {
      // TODO: validate start date is after date.now

    } else {
      // TODO: validate end date is after start date
    }
    if (!errorMessage) {
      setFormState({ ...formState, [type]: value });
    }
  }

  function datePicker(type) {
    const [value, setValue] = React.useState<Date | null>(null);
  
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={type}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            handleDateChange(newValue, type);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }

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
        <h3>Pick a start date for your trip:</h3>
        {datePicker('startDate')}
        <h3>Pick an end date for your trip:</h3>
        {datePicker('endDate')}
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
