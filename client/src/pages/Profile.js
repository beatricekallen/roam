import React from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_FRIEND } from '../utils/mutations';
import { QUERY_ME, QUERY_USER } from '../utils/queries';

import TripInput from '../components/TripInput';
import TripList from "../components/TripList";
import Auth from "../utils/auth";
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';

const Profile = (props) => {
  const { username: userParam } = useParams();
  const [addFriend] = useMutation(ADD_FRIEND);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {/* Only show "add friend" when viewing another user's profile */}
        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 col-lg-9 mb-3">
          <TripList trips={user.trips} title={`${user.username}'s trips`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          {user.friends.map((friend) => (
            <List dense="false">
                <Link to={`/profile/${friend.username}`}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={friend.username}
                      secondary={null}
                    />
                  </ListItem>
                </Link>
            </List>
          ))}
        </div>
      </div>
      <div className="mb-3">{!userParam && <TripInput />}</div>
    </div>
  );
};

export default Profile;
