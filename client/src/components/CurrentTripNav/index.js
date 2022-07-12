const CurrentTripNav = (props) => {
  const tabs = ["Itinerary", "Splitwise", "Carbon-offsetting"];

  return (
    <div>
      {tabs.map((tab) => (
        <a
          className="nav-item"
          key={tab}
          href={"#" + tab.toLowerCase()}
          onClick={() => props.handlePageChange(tab)}
        >
          {tab}
        </a>
      ))}
    </div>
  );
};

export default CurrentTripNav;
