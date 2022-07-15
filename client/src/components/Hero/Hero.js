import React from "react";
// import { Link } from 'react-router-dom';
import "./Hero.css";

const Hero = () => {
  return (
    <div className="home__hero-section hero__img">
      <div>
        <div className="home__hero-text-wrapper">
          <h3 className="top-line">Travel Sustainably With</h3>
          <h1 className="heading">Roam</h1>
          <p className="home__hero-subtitle">
            Let us help you plan your next trip, track expenses, and even offset
            your carbon footprint.
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
  );
};

export default Hero;
