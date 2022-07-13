import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//TODO: need to update to route to different components on click. need to confirm trip information being passed in here is correct with backend.

const TripList = ({ trips }) => {
  return (
    <div>
      <h2>Plan a solo trip</h2>
      <h2>Plan a trip with friends</h2>
      <h2>Upcoming Trips</h2>
      <h2>Previous Trips</h2>
      {trips.map((trip) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={trip.image}
            alt={trip.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {trip.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {trip.location}
              {trip.dates}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View Trip</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default TripList;
