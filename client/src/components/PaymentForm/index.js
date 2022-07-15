import React from 'react';
import Button from "@mui/material/Button";
import { useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';

const PaymentForm = function() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payment = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://localhost:3000/stripe`
        }
      });
      console.log(payment);
  
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button variant="contained" type="submit">
          Submit Payment
      </Button>
    </form>
  )
};

export default PaymentForm;
