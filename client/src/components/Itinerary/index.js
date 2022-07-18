import { useState} from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TRIP } from "../../utils/mutations"
import { getFormattedDate } from "../../utils/dateFormat";
import { validateEmail } from "../../utils/helpers";

import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";

import mapImage from "./assets/mapimage.png"
import friendsImage from "./assets/friendsimage.jpg"
import calendarImage from "./assets/calendarimage.jpg"
import travelImage from "./assets/travelimage.jpg"

const Itinerary = ({trip}) => {
    const [updateTrip, { error }] = useMutation(UPDATE_TRIP);

    const [toggleEdit, setToggleEdit] = useState('info');
    const [formState, setFormState] = useState({
        location: "",
        startDate: "",
        endDate: "",
        transportation: "",
        budget: "",
        friends: "",
        name: ""
      });

    const {location, transportation, budget, friends, name } = formState;
    
    const [errorMessage, setErrorMessage] = useState("");

    const editHandler = (event, editStatus) => {
        setToggleEdit(editStatus);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!errorMessage) {
          setFormState({ [e.target.name]: e.target.value });
          console.log("Form", formState);
        }
    
        // update db with trip info
        try {
          await updateTrip({
            variables: {
              _id: trip._id,
              location: location,
              startDate: getFormattedDate(startValue),
              endDate: getFormattedDate(endValue),
              transportation: transportation,
              budget: budget,
              members: [friends],
              name: name
            },
          });
        } catch (e) {
          console.error(e);
        }

        return window.location.reload();
      };

    const handleChange = (e) => {
        if (e.target.name === "friends") {
          const isValid = validateEmail(e.target.value);
          if (!isValid) setErrorMessage("That email is invalid.");
          else setErrorMessage("");
          
        } else {
          if (!e.target.value.length) setErrorMessage(`This information is required.`);
          else setErrorMessage("");
        }

        if (!errorMessage) setFormState({ ...formState, [e.target.name]: e.target.value });
        
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
        <Container>
            <h1 style={{
                textAlign: "center"
            }}>{trip.name}</h1>
            <div style={{
                marginTop: 10, 
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div>
                    <h2>Location: {trip.location}!</h2>
                    <h3>Budget ${trip.budget}</h3>
                </div>
                <ToggleButtonGroup
                    value={toggleEdit}
                    exclusive
                    onChange={editHandler}
                    aria-label="text alignment"
                    >
                    <ToggleButton value="info" aria-label="info toggle">
                       Info
                    </ToggleButton>
                    <ToggleButton value="edit" aria-label="edit toggle">
                       Edit
                    </ToggleButton>
                </ToggleButtonGroup>
                            
            </div>
            {toggleEdit === "info" &&
            <Box sx={{flexGrow: 1, flexShrink: 1, marginTop: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="350"
                                width="350"
                                image={mapImage}
                                alt="View of the US Embassy"
                            />
                        </Card>
                        <Card style={{
                            marginTop: 15,
                            width: "70%",
                            justifySelf: "right"
                        }}>
                            <CardMedia
                                component="img"
                                height="120"
                                image={friendsImage}
                                alt="View of the US Embassy"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {trip.members ? "Members" : "No other atendees"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                               {trip.members && trip.members.map((member, i) => (
                                <span key={i} style={{
                                    marginLeft: 10
                                }}>{member}</span>

                               ))}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                        <Grid item xs={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={calendarImage}
                                alt="View of the US Embassy"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                Trip Dates
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <>
                                        <span>Start Date:{trip.startDate}</span>
                                        <span style={{marginLeft: 8}}>End Date: {trip.endDate}</span>
                                    </>
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card style={{
                            marginTop: 10
                        }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={travelImage}
                                alt="View of the US Embassy"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                Travel Method: {trip.transportation}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                    </Grid>
                </Box>
            }
            {toggleEdit === "edit" && (
               (
                    <div className="create-trip-container">
                      <div className="headings">
                        <h2>Edit Your Trip</h2>
                        <h3>Enter in your trip information.</h3>
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
                )
            )}
        </Container>
    )
}

export default Itinerary;