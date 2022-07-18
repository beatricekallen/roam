import { useState, useEffect} from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { UPDATE_TRIP } from "../../utils/mutations"
import { QUERY_TRIP_EXPENSES } from "../../utils/queries";
import { QUERY_ME_BASIC } from "../../utils/queries";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


import mapImage from "./assets/mapimage.png";
import friendsImage from "./assets/friendsimage.jpg";
import calendarImage from "./assets/calendarimage.jpg";
import travelImage from "./assets/travelimage.jpg";
import planImage from "./assets/planimage.png";
import expensesImage from "./assets/expensesimage.jpg";

import "./index.css";

const Itinerary = ({trip}) => {

    const [updateTrip, { error }] = useMutation(UPDATE_TRIP);
    const [loadMyData, { data }] = useLazyQuery(QUERY_ME_BASIC);
   

    const {loading, data: expenses} = useQuery(trip && QUERY_TRIP_EXPENSES, {
            variables: {id: trip._id}
    });

    if (!loading) console.log(expenses);
    const [toggleEdit, setToggleEdit] = useState('info');
    const [formState, setFormState] = useState({});
    const { name, location, transportation, budget } = formState;
    const [errorMessage, setErrorMessage] = useState("");

    const [startValue, setStartValue] = useState("");
    const [endValue, setEndValue] = useState("");

    const [friendDataState, setFriendDataState] = useState({})
    const { addedFriends, notAddedFriends } = friendDataState;

    useEffect(() => {
        loadMyData();
      }, []);

    useEffect(() => {
        if (data) {
          setFriendDataState({notAddedFriends: data.me.friends, addedFriends: []});
        }
    }, [data])
    

    const editHandler = (event, editStatus) => {
        setToggleEdit(editStatus);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formEmpty = Object.values(formState).every(child => {
            if (child === null) return true;
            return false;
        })

        if (formEmpty) return;
        if (addedFriends) console.log(addedFriends);
        
    
        // update db with trip info
        try {
          await updateTrip({
            variables: {
              id: trip._id,
              budget: budget,
              location: location,
              ...startValue && {startDate: getFormattedDate(startValue)},
              ...endValue && {endDate: getFormattedDate(endValue)},
              transportation: transportation,
              members: addedFriends.map(friend => friend._id),
            },
          });
        } catch (e) {
          console.error(e);
        }

        console.log("Success!");
        return window.location.reload();
      };

    const handleChange = (e) => {
        if (e.target.name === "friends") {
          const isValid = validateEmail(e.target.value);
          if (!isValid) setErrorMessage("That email is invalid.");
          else setErrorMessage("");
          
        } 
        if (!errorMessage) setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleAddFriend = e => {
        setFriendDataState({
          notAddedFriends: notAddedFriends.filter(friend => friend !== e.target.value),
          addedFriends: [...addedFriends, e.target.value]
      });
      }
    
    const handleRemoveFriend= e => {
        // get index from ClearIcon
        e.preventDefault();
        const i = e.target.dataset.id;
        const removedFriend = {...addedFriends[i]};
        setFriendDataState({
          notAddedFriends: [...notAddedFriends, removedFriend],
          addedFriends: addedFriends.filter(friend => friend._id !== removedFriend._id)
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
        <div class="parent-container">
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
                    <h3>Budget - {trip.budget && `$${trip.budget}` || "None"}</h3>
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
                    <Grid container>
                        <Grid item xs={6}>
                        <Card style={{
                            width: "80%",
                            height: "35%"
                        }}>
                            <CardMedia
                                component="img"
                                image={mapImage}
                                alt="View of the US Embassy"
                 
                            />
                        </Card>
                        <Card style={{
                            marginTop: 15,
                            width: "70%",
                            height: "30vh",
                            justifySelf: "right"
                        }}>
                            <CardMedia
                                component="img"
                                height="50%"
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
                                }}>User: {member.username}</span>

                               ))}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                        <Grid item xs={6} style={{
                            display: "flex",
                            height: "50vh",
                            flexWrap: "wrap"
                        }}>
                            <Card style={{
                                height: "65%",
                                width: "45%",
                                marginRight: "20px"
                            }}>
                                <CardMedia
                                    component="img"
                                    height="50%"
                                    image={calendarImage}
                                    alt="View of a calendar"
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
                                height: "75%",
                                width: "45%",
                                marginLeft: "10px"
                            }}>
                                <CardMedia
                                    component="img"
                                    height="50%"
                                    image={expensesImage}
                                    alt="View of friends jumping during a sunset"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {expenses && expenses.trip_expenses.length ? "Expenses" : "No Expenses Currently"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                {expenses && expenses.trip_expenses.length && expenses.trip_expenses.map((expense, i) => (
                                    <span key={i}>
                                        <p>Item - {expense.item}</p>
                                        <p>Price - ${expense.totalPrice}</p>
                                    </span>

                                ))}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card style={{
                                marginTop: 10,
                                width: "60%",
                                height: "30vh"

                            }}>
                                <CardMedia
                                    component="img"
                                    height= "60%"
                                    image={travelImage}
                                    alt="View of travel"
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
                <Box sx={{flexGrow: 1, flexShrink: 1, marginTop: 1}}>
                <div className="headings">
                    <h2>Edit Trip</h2>
                    <h3>Results will also reflect in your Itinerary!</h3>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <form onSubmit={handleSubmit}>
                            <h3>Edit Destination</h3>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                            <TextField
                            fullWidth
                            label="Optional"
                            name="location"
                            onBlur={handleChange}
                            defaultValue={location}
                            style={{
                                width: "70%",
                                alignSelf: "flex-start"
                            }}
                            />
                            <button type="submit" style={{
                                color: "#FFFFFF"
                            }}>Update</button>
                            </div>
                            <div style={{
                                display: "flex",
                                marginTop: "10px",
                                width: "70%"
                            }}>
                                <h3 style={{marginRight: "5px"}}>Edit Start Date </h3>
                                {datePicker("startDate")}
                                <h3 style={{marginLeft: "15px", marginRight: "5px"}}>Edit End Date</h3>
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
                                width: "70%"
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
                                width: "70%"
                            }}
                            />
                            <h3>Add Friends!</h3>
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
                                        alignItems: 'center',
                                        minWidth: 150, 
                                        maxWidth: 250, 
                                        p: 1, 
                                        m: 1, 
                                        border: 1, 
                                        borderColor: 'grey.300', 
                                        bgcolor: 'grey.50' }} >
                                    <h4>{friend.username}</h4>
                                    <button data-id={i} onClick={handleRemoveFriend} className="remove-friend-btn">X</button>
                                    </Card>
                                )
                                })}
                            {errorMessage && (
                            <div>
                                <p className="error-text">{errorMessage}</p>
                            </div>
                            )}
                        </form>
                    </Grid>
                    <Grid item xs={5}>
                        <div style={{
                            display: "flex",
                            justifyContent: "center"
                        }}>
                        <img src={planImage} style={{
                            width: "50%",
                            height: "50%"
                        }} />
                        </div>
                    </Grid>
                </Grid>
                </Box>
            )}
        </div>
    )

}

export default Itinerary;