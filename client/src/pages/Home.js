import React from "react";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";

import "./Home.css";

const Home = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="home__hero-section hero__img">
        <div>
          <div className="home__hero-text-wrapper">
            <h3 className="top-line">Travel Sustainably With</h3>
            <h1 className="heading">Roam</h1>
            <p className="home__hero-subtitle">
              Let us help you plan your next trip, track expenses, and even
              offset your carbon footprint.
            </p>
            <div className="home__hero-img-wrapper">
              <img className="home__hero-img" src="/" alt=""></img>
            </div>
            {/* <Link to="/">
            <button>Discover More</button>
          </Link> */}
            <button>Discover More</button>
          </div>
        </div>
      </div>
      <div className="home__section friends__img">
        <div className="home__text-wrapper">
          <div className="home__content">
            <h2 className="top-line">Plan Trips with Friends</h2>
            <p>
              Create a trip and invite friends to view the itinerary and budget.
            </p>
            {/* <img className="friends__img" src="/" alt=""></img> */}
          </div>
        </div>
      </div>

      <div className="home__section carbon__img">
        <div className="home__text-wrapper">
          <div className="home__content">
            <h2 className="top-line">Carbon Offsetting</h2>
            <p>
              Love traveling the world but want to do so sustainably? Offset the
              carbon emissions of your trip by donating to a conservation
              charity through our app.
            </p>
            <img className="carbon__img" src="/" alt=""></img>
          </div>
        </div>
      </div>
      <div className="home__section splitwise__img">
        <div className="home__text-wrapper">
          <div className="home__content">
            <h2 className="top-line">Split Expenses Among Friends</h2>
            <p>
              Traveling with friends? Awesome. Trying to settle up expenses
              after the end of the trip with friends? Not so awesome. Our
              built-in functionality allows you to track expenses and then
              easily settle up when you get home.
            </p>
            <img className="splitwise__img" src="/" alt=""></img>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
