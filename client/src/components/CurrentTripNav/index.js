import "./index.css";

const CurrentTripNav = (props) => {
  const tabs = ["Itinerary", "Splitwise", "Carbon-offsetting"];

  return (
    <nav class="navMenu">
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
