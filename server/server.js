require('dotenv').config();
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');

const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');

const cors = require('cors');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

app.post('/create_payment', cors(), async (req, res) => {
  let { amount, charity } = req.body;
  // convert dollar amount to pennies
  amount = amount * 100;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      payment_method_types: ['card'],
      metadata: {
        charity
      }
    });
    
    console.log(payment);
    res.json(payment);

  } catch (error) {
    console.log('Error', error)
    res.json({
      message: 'Payment failed',
      success: false
    });
  }
});

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// TEMPORARILY COMMENT OUT TO USE APOLLO SANDBOX LOCALLY
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
  // Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
