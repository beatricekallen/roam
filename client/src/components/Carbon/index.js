import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import natureConservancyLogo from "./assets/nature-conservancy.png";
import npfLogo from "./assets/npf-logo.png";
import scLogo from "./assets/sc-logo.gif";
import wwfLogo from "./assets/wwf-logo.jpeg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";

import StripeContainer from "../../components/StripeContainer";
import axios from "axios";
import "./index.css";

const Carbon = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [formState, setFormState] = useState({
    amount: "",
    charity: "",
  });
  const [clientSecret, setClientSecret] = useState({ client_secret: "" });

  const { amount, charity } = formState;

  const handleFormChange = (e) => {
    if (e.target.name === "amount") {
      // only accept numbers as input
      const editedValue = e.target.value.replace(/\D/g, "");
      setFormState({ ...formState, [e.target.name]: editedValue });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [showCheckout]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/create_payment",
        {
          amount,
          charity,
        }
      );

      if (response.data.client_secret) {
        setClientSecret(response.data.client_secret);
        setShowCheckout(true);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      {showCheckout ? (
        <StripeContainer
          clientSecret={clientSecret}
          amount={amount}
          charity={charity}
        />
      ) : (
        <div className="carbon">
          <div className="headers">
            <h1>Carbon Offsetting</h1>
            <h2>
              Consider offsetting the carbon emissions of your trip by making a
              donation to one of these charities.
            </h2>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3} style={{ display: "flex" }}>
                <Card
                  style={{
                    marginTop: 15,
                    width: 345,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    className=".wwf-img"
                    component="img"
                    height="140"
                    image={wwfLogo}
                    alt="World Wildlife Fund logo."
                  />
                  <CardContent>
                    <h2 variant="h5" component="div">
                      World Wildlife Fund
                    </h2>
                  </CardContent>
                  <CardActions className="center">
                    <Button
                      size="small"
                      href="https://www.worldwildlife.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6} md={3} style={{ display: "flex" }}>
                <Card
                  style={{
                    marginTop: 15,
                    width: 345,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={scLogo}
                    alt="Sierra Club logo."
                  />
                  <CardContent>
                    <h2 gutterBottom variant="h5" component="div">
                      Sierra Club
                    </h2>
                  </CardContent>
                  <CardActions className="center">
                    <Button
                      size="small"
                      href="https://www.sierraclub.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6} md={3} style={{ display: "flex" }}>
                <Card
                  style={{
                    marginTop: 15,
                    width: 345,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={npfLogo}
                    alt="National Park Foundation logo."
                  />
                  <CardContent>
                    <h2 gutterBottom variant="h5" component="div">
                      National Park Foundation
                    </h2>
                  </CardContent>
                  <CardActions className="center">
                    <Button
                      size="small"
                      href="https://www.nationalparks.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6} md={3} style={{ display: "flex" }}>
                <Card
                  style={{
                    marginTop: 15,
                    width: 345,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    className="carbon-img"
                    component="img"
                    height="140"
                    image={natureConservancyLogo}
                    alt="Nature Conservancy logo."
                  />
                  <CardContent>
                    <h2 gutterBottom variant="h5" component="div">
                      Nature Conservancy
                    </h2>
                  </CardContent>
                  <CardActions className="center">
                    <Button
                      size="small"
                      href="https://www.nature.org/en-us/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <form>
          <FormControl className="form" onSubmit={handleSubmit}>
            <label id="charity-label">
              <h3>Select your charity:</h3>
            </label>
            <Select
              name="charity"
              id="charity-dropdown"
              value={charity}
              onChange={handleFormChange}
            >
              <MenuItem value="wwf">World Wildlife Fund</MenuItem>
              <MenuItem value="sierra-club">Sierra Club</MenuItem>
              <MenuItem value="park-foundation">
                National Park Foundation
              </MenuItem>
              <MenuItem value="nature-conservancy">Nature Conservancy</MenuItem>
            </Select>
            <br></br>
            <label>
              <h3>Enter your donation amount:</h3>
            </label>
            <TextField
              label="Amount"
              name="amount"
              defaultValue={amount}
              onBlur={handleFormChange}
              variant="standard"
              className="margin"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />

            <Button variant="contained" type="submit" className="button" onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
          </form>
        </div>
      )}
    </>
  );
};

export default Carbon;
