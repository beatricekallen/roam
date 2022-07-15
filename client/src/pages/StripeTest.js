import React, { useState } from 'react';
import StripeContainer from '../components/StripeContainer';

const StripeTest = function() {
  const [ showItem, setShowItem ] = useState(false);

  return (
    <div>
      <h1>Test Stripe payment page</h1>
      {showItem ? 
      <StripeContainer /> 
      : 
      <> 
        <h3>$10.00</h3>
        <button onClick={() => setShowItem(true)}>Purchase $10 item</button>
      </>
      }
    </div>
  )
};

export default StripeTest;
