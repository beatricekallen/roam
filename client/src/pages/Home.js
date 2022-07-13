import React from 'react';
import Hero from './Hero';
import {homeObjOne} from './components/Hero/Data.js';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';

function Home() {
  return (
    <>
        <Hero {...homeObjOne} />
    </>
  )
}

export default Home;
