import React from 'react';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Home = () => {

  const loggedIn = Auth.loggedIn();

  function handleSubmit(e) {
    e.preventDefault();
    console.log('check')
  }

  return (

    <main>
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
};

export default Home;
