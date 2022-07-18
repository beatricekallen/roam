import { useState } from "react";
import Itinerary from "../Itinerary";
// import Splitwise from "../Splitwise";
import Carbon from "../Carbon";
import CurrentTripNav from "../CurrentTripNav";
import Expenses from '../Expenses';

const CurrentTrip = ({data}) => {
  const [currentTab, handleTabChange] = useState("Itinerary");

  const renderTab = () => {
    switch (currentTab) {
      case "Itinerary": 
       return <Itinerary trip={data.trip} />;
      case "Expenses":
        return <Expenses trip={data.trip}/>;
      case "Carbon-offsetting":
        return <Carbon />;
    }
  };

  return (
    <>
      <CurrentTripNav
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      ></CurrentTripNav>
       <div>{renderTab()}</div> 
    </>
  );
};

export default CurrentTrip;
