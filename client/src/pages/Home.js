import React from 'react';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';

const Home = () => {


  const loggedIn = Auth.loggedIn();

  return (
    <main>
    </main>
  );
};

export default Home;
