import { useState, useEffect } from "react";
import { ADD_TRIP } from "../utils/mutations";
import { QUERY_ME_BASIC } from "../utils/queries";
import { useMutation, useLazyQuery } from "@apollo/client";
import { getFormattedDate } from "../utils/dateFormat";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { validateEmail } from "../utils/helpers";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

import "./CreateTrip.css";

const CreateTrip = () => {
  const [formState, setFormState] = useState({});

  const [addTrip] = useMutation(ADD_TRIP);

  const [loadMyData, { data }] = useLazyQuery(QUERY_ME_BASIC);

  // query user data only once on load
  useEffect(() => {
    loadMyData();
    // NOTE: Run effect once on component mount, please
    // recheck dependencies if effect is updated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [friendDataState, setFriendDataState] = useState({});
  const { addedFriends, notAddedFriends } = friendDataState;

  // set friend dropdown data after data loads
  useEffect(() => {
    if (data) {
      setFriendDataState({
        notAddedFriends: data.me.friends,
        addedFriends: [],
      });
    }
  }, [data]);

  const [errorMessage, setErrorMessage] = useState("");
  const { name, location, transportation, budget } = formState;

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
          ...(startValue && { startDate: getFormattedDate(startValue) }),
          ...(endValue && { endDate: getFormattedDate(endValue) }),
          transportation: transportation,
          budget: budget,
          members: addedFriends.map((friend) => friend._id),
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
        setErrorMessage("");
      } else {
        setErrorMessage("");
      }
    }
    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  const handleAddFriend = (e) => {
    setFriendDataState({
      notAddedFriends: notAddedFriends.filter(
        (friend) => friend !== e.target.value
      ),
      addedFriends: [...addedFriends, e.target.value],
    });
  };

  const handleRemoveFriend = (e) => {
    // get index from ClearIcon
    e.preventDefault();
    const i = e.target.dataset.id;
    const removedFriend = { ...addedFriends[i] };
    setFriendDataState({
      notAddedFriends: [...notAddedFriends, removedFriend],
      addedFriends: addedFriends.filter(
        (friend) => friend._id !== removedFriend._id
      ),
    });
  };

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
          required={true}
        />
        <h3>Where are you headed?</h3>
        <TextField
          fullWidth
          label="Destination"
          name="location"
          onBlur={handleChange}
          defaultValue={location}
          required={true}
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
          required={true}
        />
        <h3>What's your budget?</h3>
        <TextField
          fullWidth
          label="Budget"
          name="budget"
          onBlur={handleChange}
          defaultValue={budget}
        />
        <h3>Are friends joining? If so, add them from the dropdown here.</h3>
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel shrink={false}>Add friend</InputLabel>
          <Select
            name="friends"
            id="friend-dropdown"
            onChange={handleAddFriend}
            defaultValue=""
            value=""
          >
            {notAddedFriends &&
              notAddedFriends.map((friend, i) => {
                return (
                  <MenuItem value={friend} key={i}>
                    {friend.username}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        {addedFriends && (
          <div className="added-friends-container">
            {addedFriends.map((friend, i) => {
              return (
                <Card
                  value={friend}
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: 250,
                    p: 1,
                    m: 1,
                    border: 1,
                    borderColor: "grey.300",
                    bgcolor: "grey.50",
                  }}
                >
                  <h4>{friend.username}</h4>
                  <button
                    data-id={i}
                    onClick={handleRemoveFriend}
                    className="remove-friend-btn"
                  >
                    X
                  </button>
                </Card>
              );
            })}
          </div>
        )}
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <div className="headings">
          <Button type="submit" className="button">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
