import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

//TODO: need to update to route to different components on click. need to confirm trip information being passed in here is correct with backend.

const TripList = ({ trips }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Upcoming Trips</h1>
      {/* NEED TO CHANGE TO UPCOMING TRIPS */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {trips.map((trip) => (
            <Grid item xs={6} md={3}>
              <Card key={trip._id} sx={{ maxWidth: 345 }}>
                <CardContent>
                  <h2>{trip.name}</h2>
                  <h3>{trip.location}</h3>
                  <h4>Start date: {trip.startDate}</h4>
                  <h4>End date: {trip.endDate}</h4>
                </CardContent>
                <CardActions>
                  <button size="small">View Trip</button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <h1>Previous Trips</h1>
      {/* NEED TO CHANGE TO PREVIOUS TRIPS */}

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {trips.map((trip) => (
            <Grid item xs={6} md={3}>
              <Card key={trip._id} sx={{ maxWidth: 345 }}>
                <CardContent>
                  <h2>{trip.name}</h2>
                  <h3>{trip.location}</h3>
                  <h4>Start date: {trip.startDate}</h4>
                  <h4>End date: {trip.endDate}</h4>
                </CardContent>
                <CardActions>
                  <button
                    size="small"
                    onClick={() => navigate("/viewtrip/:_id")}
                  >
                    View Trip
                  </button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default TripList;
