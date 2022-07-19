import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { UPDATE_TRIP, DELETE_TRIP } from "../../utils/mutations";
import { QUERY_TRIP_EXPENSES, QUERY_ME_BASIC } from "../../utils/queries";
import { getFormattedDate } from "../../utils/dateFormat";
import { validateEmail } from "../../utils/helpers";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CardContent from "@mui/material/CardContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

import mapImage from "./assets/mapimage.png";
import friendsImage from "./assets/friendsimage.jpg";
import calendarImage from "./assets/calendarimage.jpg";
import travelImage from "./assets/travelimage.jpg";
import planImage from "./assets/planimage.png";
import expensesImage from "./assets/expensesimage.jpg";
import flightImage from "./assets/flight.png";
import planningImage from "./assets/planning.png";
import multipleExpenses from "./assets/multipleexpenses.png";

import "./index.css";

const Itinerary = ({ trip }) => {
  const [updateTrip, { error }] = useMutation(UPDATE_TRIP);
  const [deleteTrip, { error: deleteError }] = useMutation(DELETE_TRIP);
  const [loadMyData, { data }] = useLazyQuery(QUERY_ME_BASIC);

  const { loading, data: expenses } = useQuery(trip && QUERY_TRIP_EXPENSES, {
    variables: { id: trip._id },
  });

  const [toggleChoices, settoggleChoices] = useState("info");
  const [formState, setFormState] = useState({});
  const { name, location, transportation, budget } = formState;
  const [errorMessage, setErrorMessage] = useState("");

  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");

  const [friendDataState, setFriendDataState] = useState({});
  const { addedFriends, notAddedFriends } = friendDataState;

  useEffect(() => {
    loadMyData();
  }, []);

  useEffect(() => {
    if (data) {
      setFriendDataState({
        notAddedFriends: data.me.friends,
        addedFriends: [],
      });
    }
  }, [data]);

  const editHandler = (event, editStatus) => {
    settoggleChoices(editStatus);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formEmpty = Object.values(formState).every((child) => {
      if (child === null) return true;
      return false;
    });

    if (formEmpty) return;

    // update db with trip info
    try {
      await updateTrip({
        variables: {
          id: trip._id,
          budget: budget,
          location: location,
          ...(startValue && { startDate: getFormattedDate(startValue) }),
          ...(endValue && { endDate: getFormattedDate(endValue) }),
          transportation: transportation,
          members: addedFriends.map((friend) => friend._id),
        },
      });
    } catch (e) {
      console.error(e);
    }

    setUpdateModal(true);
  };

  const handleChange = (e) => {
    if (e.target.name === "friends") {
      const isValid = validateEmail(e.target.value);
      if (!isValid) setErrorMessage("That email is invalid.");
      else setErrorMessage("");
    }
    if (!errorMessage)
      setFormState({ ...formState, [e.target.name]: e.target.value });
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

  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const handleReload = () => {
    return window.location.reload();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    if (toggleChoices == "delete") {
      settoggleChoices("info");
      setOpen(false);
    }
  };

  const handleOn = () => setOn(true);

  const handleRedirect = () => {
    window.location.assign("/profile");
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

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await deleteTrip({
        variables: {
          _id: trip._id,
        },
      });
    } catch (e) {
      console.log(e);
    }
    handleOn();
  };

  return (
    <div className="parent-container">
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>{trip.name}</h1>
        <h2
          style={{
            color: "var(--clr-blue)",
          }}
        >
          Location: {trip.location}!
        </h2>
        <h3
          style={{
            color: "var(--clr-blue)",
          }}
        >
          Budget - {(trip.budget && `$${trip.budget}`) || "None"}
        </h3>
      </div>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to="/profile">
          <Button className="button">Back to Trips</Button>
        </Link>
        <ToggleButtonGroup
          value={toggleChoices}
          exclusive
          onChange={editHandler}
          aria-label="text alignment"
        >
          <ToggleButton value="info" aria-label="info toggle">
            <h4>Info</h4>
          </ToggleButton>
          <ToggleButton value="edit" aria-label="edit toggle">
            <h4>Edit</h4>
          </ToggleButton>
          <ToggleButton
            value="delete"
            aria-label="edit toggle"
            onClick={handleOpen}
          >
            <h4>Delete</h4>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "30%",
              height: "350px",
              color: "#000",
              backgroundColor: "#fff",
              position: "absolute",
              top: "30%",
              left: "38%",
              borderRadius: "20px",
              padding: "10px 30px 70px",
            }}
          >
            <p
              onClick={handleClose}
              style={{
                alignSelf: "flex-end",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              x
            </p>
            <img
              src={flightImage}
              alt="illustration of an airplane"
              style={{
                width: "50%",
                height: "50%",
                backgroundColor: "white",
              }}
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Trip?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You'll have more opportunities to enjoy a trip with your friends!
            </Typography>
            <div>
              <Button class="modal-btn cancel" onClick={handleClose}>
                Cancel
              </Button>
              <Button class="modal-btn delete" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={on}
          onClose={handleRedirect}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "30%",
              height: "350px",
              color: "#000",
              backgroundColor: "#fff",
              position: "absolute",
              top: "30%",
              left: "38%",
              borderRadius: "20px",
              padding: "10px 30px 70px",
            }}
          >
            <p
              onClick={handleRedirect}
              style={{
                alignSelf: "flex-end",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              x
            </p>
            <img
              src={planningImage}
              alt="illustration of an airplane"
              style={{
                width: "50%",
                height: "50%",
                backgroundColor: "white",
              }}
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Trip has been scrapped.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Aww, maybe you'll try and attend another trip soon!
            </Typography>
            <div>
              <button class="modal-btn ok" onClick={handleRedirect}>
                Ok
              </button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={updateModal}
          onClose={handleReload}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "30%",
              height: "350px",
              color: "#000",
              backgroundColor: "#fff",
              position: "absolute",
              top: "30%",
              left: "38%",
              borderRadius: "20px",
              padding: "10px 30px 70px",
            }}
          >
            <p
              onClick={handleReload}
              style={{
                alignSelf: "flex-end",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              x
            </p>
            <img
              src={multipleExpenses}
              alt="illustration of an airplane"
              style={{
                width: "50%",
                height: "50%",
                backgroundColor: "white",
              }}
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Trip has been updated.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Now you can feel better attending it!
            </Typography>
            <div>
              <button class="modal-btn ok" onClick={handleReload}>
                Ok
              </button>
            </div>
          </Box>
        </Modal>
      </div>
      {toggleChoices === "info" && (
        <Box sx={{ flexGrow: 1, flexShrink: 1, marginTop: 1 }}>
          <Grid container>
            <Grid item xs={6}>
              <Card
                style={{
                  width: "80%",
                  height: "35%",
                }}
              >
                <CardMedia
                  component="img"
                  image={mapImage}
                  alt="View of the US Embassy"
                />
              </Card>
              <Card
                style={{
                  marginTop: 15,
                  width: "70%",
                  height: "30vh",
                  justifySelf: "right",
                }}
              >
                <CardMedia
                  component="img"
                  height="50%"
                  image={friendsImage}
                  alt="View of the US Embassy"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <h3>{trip.members ? "Friends" : "No other attendees"}</h3>
                  </Typography>
                    {trip.members &&
                      trip.members.map((member, i) => (
                        <span
                          key={i}
                          style={{
                            marginLeft: 10,
                          }}
                        >
                          <p>User: {member.username} </p>
                        </span>
                      ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                height: "50vh",
                flexWrap: "wrap",
              }}
            >
              <Card
                style={{
                  height: "65%",
                  width: "45%",
                  marginRight: "20px",
                }}
              >
                <CardMedia
                  component="img"
                  height="50%"
                  image={calendarImage}
                  alt="View of a calendar"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <h3>Trip Dates</h3>
                  </Typography>
                    <>
                      <span>
                        <p>Start Date: {trip.startDate}</p>
                        <p>End Date: {trip.endDate}</p>
                      </span>
                    </>
                </CardContent>
              </Card>
              <Card
                style={{
                  height: "75%",
                  width: "45%",
                  marginLeft: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  height="50%"
                  image={expensesImage}
                  alt="View of friends jumping during a sunset"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <h3>
                        {expenses && expenses.trip_expenses.length
                            ? "Expenses"
                            : "No Expenses Currently"}
                        </h3>
                    </Typography>
                    {expenses &&
                        expenses.trip_expenses.length &&
                        expenses.trip_expenses.map((expense, i) => (
                        <span key={i}>
                            <p>Item - {expense.item}</p>
                            <p>Price - ${expense.totalPrice}</p>
                        </span>
                        ))}
                </CardContent>
              </Card>
              <Card
                style={{
                  marginTop: 10,
                  width: "60%",
                  height: "30vh",
                }}
              >
                <CardMedia
                  component="img"
                  height="60%"
                  image={travelImage}
                  alt="View of travel"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <h3>Travel Method: {trip.transportation}</h3>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      {toggleChoices === "edit" && (
        <Box sx={{ flexGrow: 1, flexShrink: 1, marginTop: 1 }}>
          <div
            className="headings"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              paddingTop: 0,
            }}
          >
            <h2
              style={{
                color: "var(--clr-blue)",
              }}
            >
              Edit Trip
            </h2>
            <h3>Results will also reflect in your Itinerary!</h3>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={7} style={{ position: "relative" }}>
              <form onSubmit={handleSubmit}>
                <h3>Edit Destination</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    fullWidth
                    label="Optional"
                    name="location"
                    onBlur={handleChange}
                    defaultValue={location}
                    style={{
                      width: "70%",
                      alignSelf: "flex-start",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    width: "70%",
                  }}
                >
                  <h3 style={{ marginRight: "5px" }}>Edit Start Date </h3>
                  {datePicker("startDate")}
                  <h3 style={{ marginLeft: "15px", marginRight: "5px" }}>
                    Edit End Date
                  </h3>
                  {datePicker("endDate")}
                </div>
                <h3>Edit Transportation</h3>
                <TextField
                  fullWidth
                  label="Optional"
                  name="transportation"
                  onBlur={handleChange}
                  defaultValue={transportation}
                  style={{
                    width: "70%",
                  }}
                />
                <h3>Edit Budget</h3>
                <TextField
                  fullWidth
                  label="Optional"
                  name="budget"
                  onBlur={handleChange}
                  defaultValue={budget}
                  style={{
                    width: "70%",
                  }}
                />
                <h3>Edit Trip Friends!</h3>
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
                {addedFriends &&
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
                }
                {errorMessage && (
                  <div>
                    <p className="error-text">{errorMessage}</p>
                  </div>
                )}
              </form>
            </Grid>
            <Grid item xs={5}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={planImage}
                  style={{
                    width: "50%",
                    height: "50%",
                  }}
                />
              </div>
            </Grid>
          </Grid>
            <div className='submitButtonWrapper'>
                <Button
                    className="update"
                    type="submit"
                    style={{
                        color: "#FFFFFF",
                    }}
                    >
                    Submit
                </Button>
            </div>
        </Box>
      )}
    </div>
  );
};

export default Itinerary;
