import { useState, useEffect } from "react";
import { ADD_TRIP } from "../utils/mutations";
import { QUERY_ME_BASIC } from "../utils/queries";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import ClearIcon from '@mui/icons-material/Clear';

import "./CreateTrip.css";

const CreateTrip = () => {

  const [formState, setFormState] = useState({});

  const [addTrip] = useMutation(ADD_TRIP);

  const [loadMyData, { loading, data }] = useLazyQuery(QUERY_ME_BASIC);

  // query user data only once on load
  useEffect(() => {
    loadMyData();
  }, []);

  const [friendDataState, setFriendDataState] = useState({})
  const { addedFriends, notAddedFriends } = friendDataState;

  // set friend dropdown data after data loads
  useEffect(() => {
    if (data) {
      setFriendDataState({notAddedFriends: data.me.friends, addedFriends: []});
    }
  }, [data])

  const [errorMessage, setErrorMessage] = useState("");
  const { name, location, transportation, budget, friends } = formState;

  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errorMessage) {
      // setFormState({ [e.target.name]: e.target.value });
      console.log("Form", formState);
    }
    // update db with trip info
    try {
      await addTrip({
        variables: {
          name: name,
          location: location,
          ...startValue && {startDate: getFormattedDate(startValue)},
          ...endValue && {endDate: getFormattedDate(endValue)},
          transportation: transportation,
          budget: budget,
          members: addedFriends.map(friend => friend._id),
        },
      });
    } catch (e) {
      console.error(e);
    }

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

  const handleAddFriend = e => {
    setFriendDataState({
      notAddedFriends: notAddedFriends.filter(friend => friend != e.target.value),
      addedFriends: [...addedFriends, e.target.value]
  });
  }

  const handleRemoveFriend= e => {
    // get index from ClearIcon
    const i = e.target.dataset.id;
    const removedFriend = {...addedFriends[i]};
    setFriendDataState({
      notAddedFriends: [...notAddedFriends, removedFriend],
      addedFriends: addedFriends.filter(friend => friend._id != removedFriend._id)
    });
  }

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
        <FormControl>
        <h3>Are friends joining? If so, add them from the dropdown here.</h3>
        <Select
          name="friends"
          id="friend-dropdown"
          onChange={handleAddFriend}
          defaultValue=""
          value=""
        >
          {notAddedFriends &&
            notAddedFriends.map((friend, i) => {
              return <MenuItem value={friend} key={i}>{friend.username}</MenuItem>
            })}
        </Select>
        </FormControl>
          {addedFriends &&
            addedFriends.map((friend, i) => {
              return (
                <Card value={friend} key={i} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    minWidth: 150, 
                    maxWidth: 250, 
                    p: 2, 
                    m: 1, 
                    border: 1, 
                    borderColor: 'grey.300', 
                    bgcolor: 'grey.100' }} >
                  <h4>{friend.username}</h4>
                  <ClearIcon data-id={i} onClick={handleRemoveFriend} sx={{ 
                    bg: 'white', 
                    width: 25, 
                    height: 25, 
                    '&:hover': { bgcolor: 'grey.300', cursor: 'pointer' } }} 
                  />
                </Card>
              )
            })}
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
