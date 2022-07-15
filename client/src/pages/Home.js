import React from 'react';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Home = () => {

  const { data: userData } = useQuery(QUERY_ME);

  console.log(userData);


  const loggedIn = Auth.loggedIn();

  return (
    <main>
    </main>
  );
};

export default Home;
