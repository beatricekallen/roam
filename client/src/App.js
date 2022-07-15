import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Navigation from "./components/Navigation/Navigation";
import Hero from './components/Hero/Hero';
import Friends from './components/Friends/Friends';
import SplitwiseHome from './components/SplitwiseHome/Splitwise';
import CarbonHome from './components/CarbonHome/Carbon';
import Footer from "./components/Footer/Footer";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import NoMatch from "./pages/NoMatch";
// import Profile from "./pages/Profile";
// import Signup from "./pages/Signup";
import Splitwise from "./components/Splitwise";

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
      {/* <Router> */}
        <div className="flex-column justify-flex-start min-100-vh">
          <Navigation />
          <div className="container">
            {/* <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NoMatch />} />
            </Routes> */}
            {/* <Splitwise /> */}
          </div>
          <Hero />
          <Friends />
          <SplitwiseHome />
          <CarbonHome />
          <Footer />
        </div>
      {/* </Router> */}
    </ApolloProvider>
  );
}

export default App;
