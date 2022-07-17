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
        return 
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
       <Itinerary  trip={data.trip} />;
    </>
  );
};

export default CurrentTrip;
