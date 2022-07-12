import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import natureConservancyLogo from "./assets/nature-conservancy.png";
import npfLogo from "./assets/npf-logo.png";
import scLogo from "./assets/sc-logo.png";
import wwfLogo from "./assets/wwf-logo.png";

const Carbon = () => {
  //TODO: need to add functionality to take people to the Stripe page after selecting a charity
  //TODO: add ability to calculate distance and carbon footprint with Google Matrix API?

  return (
    <div>
      <h2>
        Consider offsetting the carbon footprint of your trip by making a
        donation to one of these charities.
      </h2>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={wwfLogo}
          alt="World Wildlife Fund logo."
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            World Wildlife Fund
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href="https://www.worldwildlife.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={scLogo}
          alt="Sierra Club logo."
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sierra Club
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href="https://www.sierraclub.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={npfLogo}
          alt="National Park Foundation logo."
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            National Park Foundation
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href="https://www.nationalparks.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={natureConservancyLogo}
          alt="Nature Conservancy logo."
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Nature Conservancy
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href="https://www.nature.org/en-us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </Button>
        </CardActions>
      </Card>

      <select name="charity-dropdown" id="charity-dropdown">
        <option value="wwf">World Wildlife Fund</option>
        <option value="sierra-club">Sierra Club</option>
        <option value="park-foundation">National Park Foundation</option>
        <option value="nature-conservancy">Nature Conservancy</option>
      </select>
    </div>
  );
};

export default Carbon;
