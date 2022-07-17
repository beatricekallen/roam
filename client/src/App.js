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
import CreateTrip from "./pages/CreateTrip";
import StripeSuccess from "./components/StripeSuccess";
import Carbon from "./components/Carbon";
import NeedLogin from "./pages/NeedLogin";
// import Splitwise from "./components/Splitwise";

import Auth from './utils/auth';

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

const loggedIn = Auth.loggedIn();

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
              {loggedIn 
                ?
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
                :
              <Route path="/profile">
                <Route path=":username" element={<NeedLogin />} />
                <Route path="" element={<NeedLogin />} />
              </Route>
              }
              {loggedIn
                ? <Route path="/createtrip" element={<CreateTrip />} />
                : <Route path="/createtrip" element={<NeedLogin />} />
              }
              <Route path="/stripe-success" element={<StripeSuccess />} />
              <Route path="/stripe-test" element={<Carbon />} />
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
