import React from 'react';
import Button from "@mui/material/Button";
import { useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';

import { formatCharity } from '../../utils/helpers';

const PaymentForm = function({ amount, charity }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payment = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://localhost:3000/stripe-success`
        }
      });
      console.log(payment);
  
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>${amount} donation to the {formatCharity(charity)}</h2>
      <PaymentElement />
      <Button variant="contained" type="submit">
          Submit Payment
      </Button>
    </form>
  )
};

export default PaymentForm;
