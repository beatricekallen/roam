import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm';

const PUBLIC_KEY = 'pk_test_51LJNIPLD5VBzpbpSKwJbCNTloaOFuuSktJG2lDNJ6zKkAGYToFsgq7E6iV1yEf6QChqoBLQfmtLSe3abxGJ6sxwx00zDfoyw2n'

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = function() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  )
};

export default StripeContainer;
