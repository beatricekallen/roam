import React, { useState } from 'react';
import StripeContainer from '../components/StripeContainer';
import Button from "@mui/material/Button";
import axios from 'axios'

const StripeTest = function() {
  const [showItem, setShowItem] = useState(false);
  const [formState, setFormState] = useState({ amount: '' })
  const [clientSecret, setClientSecret] = useState({ client_secret: '' });

  const { amount } = formState;

  const handleChange = (e) => {
    setFormState({ [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/create_payment', {
        amount: amount,
      });

      if (response.data.client_secret) {
        setClientSecret(response.data.client_secret);
        setShowItem(true);
      }

    } catch (error) {
      console.log('Error', error);
    }
  }

  return (
    <div>
      <h1>Test Stripe payment page</h1>
      {showItem ? <StripeContainer clientSecret={clientSecret} amount={amount}/> 
      : 
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input type="text" name="amount" value={amount} onChange={handleChange}/>
        </label>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      }
    </div>
  )
};

export default StripeTest;
