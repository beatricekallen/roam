import { useState } from "react";
import Itinerary from "../Itinerary";
// import Splitwise from "../Splitwise";
import Carbon from "../Carbon";
import CurrentTripNav from "../CurrentTripNav";

const CurrentTrip = ({data}) => {
  const [currentTab, handleTabChange] = useState("Itinerary");

  const renderTab = () => {
    switch (currentTab) {
      case "Itinerary": 
       return <Itinerary trip={data.trip} />;
      case "Splitwise":
        // return <Splitwise />;
      default:
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
