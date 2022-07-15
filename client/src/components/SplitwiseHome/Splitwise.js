import React from "react";
import "./Splitwise.css";

function SplitwiseHome() {
  return (
    <div className="home__splitwise-section splitwise__img">
      <div className="home__splitwise-text-wrapper">
        <div className="splitwise__content">
          <h2 className="top-line">Split Expenses Among Friends</h2>
          <p>
            Traveling with friends? Awesome. Trying to settle up expenses after
            the end of the trip with friends? Not so awesome. Our built-in
            functionality allows you to track expenses and then easily settle up
            when you get home.
          </p>
          <img className="splitwise__img" src="/" alt=""></img>
        </div>
      </div>
    </div>
  );
}

export default SplitwiseHome;
