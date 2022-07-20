import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate, Link } from "react-router-dom";
import Auth from "../../utils/auth";
import "./index.css";

const TripList = ({ trips, profileUsername }) => {
  const navigate = useNavigate();

  // current past upcoming, trip.status

  const currentTrip = trips.filter((trip) => {
    return trip.status === "current";
  });

  const upcomingTrips = trips.filter((trip) => {
    return trip.status === "upcoming";
  });

  const previousTrips = trips.filter((trip) => {
    return trip.status === "passed";
  });

  const loggedInUsername = Auth.getProfile().data.username;

  const friendsOnTrip = (trip) => {
    const friendsOnTripArray = trip.members;
    let friendsUsernameArray = [];
    if (friendsOnTripArray.length) {
      for (let i = 1; i < friendsOnTripArray.length; i++) {
        friendsUsernameArray.push(trip.members[i].username);
        var friendsUsernamesFormatted = friendsUsernameArray.join(", ");
      }
    }
    return friendsUsernamesFormatted;
  };

  console.log(trips);

  return (
    <div>
      <h1>Current Trip</h1>
      {/* NEED TO CHANGE TO UPCOMING TRIPS */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {currentTrip.length ? (
            currentTrip.map((trip) => (
              <Grid
                item
                xs={6}
                md={3}
                style={{ display: "flex" }}
                key={trip._id}
              >
                <Card
                  key={trip._id}
                  style={{
                    marginTop: 15,
                    width: 345,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent style={{ whiteSpace: "pre-wrap" }}>
                    <h2>{trip.name}</h2>
                    <h3>{trip.location}</h3>
                    <h4>Start date: {trip.startDate}</h4>
                    <h4>End date: {trip.endDate}</h4>
                    <h4>Friends attending:</h4>
                    <h4>
                      {trip.members.length > 1
                        ? friendsOnTrip(trip)
                        : "No friends joining"}
                    </h4>
                  </CardContent>
                  <CardActions className="center">
                    <Link to={`/viewtrip/${trip._id}`}>
                      <Button size="small" className="button">
                        View Trip
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <div className="padding">
              {loggedInUsername == profileUsername ? (
                <h2>You're not currently on a trip!</h2>
              ) : (
                <h2>No current trips!</h2>
              )}
            </div>
          )}
        </Grid>
      </Box>

      <div>
        <h1>Upcoming Trips</h1>
      </div>
      {/* NEED TO CHANGE TO UPCOMING TRIPS */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {upcomingTrips.length ? (
            upcomingTrips.map((trip) => (
              <Grid
                item
                xs={6}
                md={3}
                style={{ display: "flex" }}
                key={trip._id}
              >
                <Card
                  key={trip._id}
                  style={{
                    marginTop: 15,
                    width: 345,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent style={{ whiteSpace: "pre-wrap" }}>
                    <h2>{trip.name}</h2>
                    <h3>{trip.location}</h3>
                    <h4>Start date: {trip.startDate}</h4>
                    <h4>End date: {trip.endDate}</h4>
                    <h4>Friends attending:</h4>
                    <h4>
                      {trip.members.length > 1
                        ? friendsOnTrip(trip)
                        : "No friends joining"}
                    </h4>
                  </CardContent>
                  <CardActions className="center">
                    <Link to={`/viewtrip/${trip._id}`}>
                      <Button size="small" className="button">
                        View Trip
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <div className="padding">
              <h2>No upcoming trips</h2>
            </div>
          )}
        </Grid>
      </Box>

      <h1>Previous Trips</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {previousTrips.length ? (
            previousTrips.map((trip) => (
              <Grid
                item
                xs={6}
                md={3}
                style={{ display: "flex" }}
                key={trip._id}
              >
                <Card
                  key={trip._id}
                  style={{
                    marginTop: 15,
                    width: 345,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent style={{ whiteSpace: "pre-wrap" }}>
                    <h2>{trip.name}</h2>
                    <h3>{trip.location}</h3>
                    <h4>Start date: {trip.startDate}</h4>
                    <h4>End date: {trip.endDate}</h4>
                    <h4>Friends who attended:</h4>
                    <h4>
                      {trip.members.length > 1
                        ? friendsOnTrip(trip)
                        : "No friends joined"}
                    </h4>
                  </CardContent>
                  <CardActions className="center">
                    <Link to={`/viewtrip/${trip._id}`}>
                      <Button size="small" className="button">
                        View Trip
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <div className="padding">
              <h2>No previous trips</h2>
            </div>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default TripList;
