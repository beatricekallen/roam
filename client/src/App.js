import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
<<<<<<< HEAD
<<<<<<< HEAD
// import Splitwise from "./components/Splitwise";
=======
import CreateTrip from './pages/CreateTrip';
import Splitwise from "./components/Splitwise";
>>>>>>> 74b8578bcd8c02b6e3761d19c848be7e0dbbd1b0
=======
import CreateTrip from "./pages/CreateTrip";
import StripeSuccess from "./components/StripeSuccess";
// import Splitwise from "./components/Splitwise";
>>>>>>> 51f536c0757d4fcfd3f6e5cdfb5254902e67433e

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Navigation />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/createtrip" element={<CreateTrip />} />
              <Route path="/stripe-success" element={<StripeSuccess />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
            {/* <Splitwise /> */}
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
