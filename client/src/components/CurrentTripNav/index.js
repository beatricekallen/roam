import "./index.css";

const CurrentTripNav = (props) => {
  const tabs = ["Itinerary", "Expenses", "Carbon-offsetting"];

  return (
    <nav className="navMenu">
      {tabs.map((tab) => (
        <a
          className="nav-item"
          key={tab}
          href={"#" + tab.toLowerCase()}
          onClick={() => props.handleTabChange(tab)}
        >
          {tab}
        </a>
      ))}
    </nav>
  );
};

export default CurrentTripNav;
