import React from "react";
// import { useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_FRIEND } from "../utils/mutations";
import { QUERY_ME, QUERY_USER } from "../utils/queries";

import TripList from "../components/TripList";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

import List from "@mui/material/List";
// import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import Avatar from "@mui/material/Avatar";
// import Carbon from "../components/Carbon";
import "./Profile.css";

const Profile = (props) => {
  const navigate = useNavigate();

  const { username: userParam } = useParams();
  const [addFriend] = useMutation(ADD_FRIEND);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log(Auth.loggedIn());

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div className="container">
        <div className="no-match">
          <h1>Oops!</h1>
          <h2>
            You need to be logged in to view that page. Sign up or log in using
            the links above!
          </h2>
          <button size="small" onClick={() => navigate("/")}>
            Return To The Homepage
          </button>
        </div>
      </div>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="profile-container">
      <div>
        <div className="headings">
          <h1>Viewing {userParam ? `${user.username}'s` : "your"} profile.</h1>
          <div>
            {!userParam && (
              <Link to={`/createtrip`}>
                <button
                  variant="contained"
                  endicon={<FlightTakeoffRoundedIcon />}
                >
                  Create a Trip!
                </button>
              </Link>
            )}
          </div>
        </div>
        {/* Only show "add friend" when viewing another user's profile */}
        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>

      <div>
        <div>
          <TripList trips={user.trips} title={`${user.username}'s trips`} />
        </div>

        <div>
          <h1>Friends List</h1>
          {user.friends.map((friend) => (
            <List dense={false}>
              <Link to={`/profile/${friend.username}`}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={friend.username} secondary={null} />
                </ListItem>
              </Link>
            </List>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
