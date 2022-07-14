//TODO: set up with Splitwise API functionality
// import {useQuery} from "@apollo/client"
// import { Route, Link } from "react-router-dom";
// import Button from "@mui/material/Button";
// import { getUrl } from "../../utils/API";
// import { LOGIN_AUTH } from "../../utils/queries";

// const [loginAuth, {data}] = useQuery(LOGIN_AUTH)

// <Route
//   path="/splitwise"
//   component={() => {
//     window.location.href = getUrl();
//     return null;
//   }}
// />;

// const Splitwise = () => {
//   return (
//     <div>
//       <Link to={`/splitwise`}>
//         {data && 
//         (<Button
//           size="small"
//           href="https://www.worldwildlife.org/"
//           target="_blank"
//           rel="noopener noreferrer"
//           // onClick={goToUrl} this was already commented out - this specific line
//         >
//           Learn More
//         </Button>)}
//       </Link>
//     </div>
//   );
// };

// export default Splitwise;

// keep track of token and secret associated with the user/user account, if you had that url, want to have one route that can be queried to get the url to nav to get oauth token, once authorized use same tokena nd secret to create instance of splitwise associated with each individual account
// on server side, great authapi, have route that whenever the user wants to get info from splitwise: whenever you need to get info about the expenses in a particular route, after you've verified the token, you'll want to have stored in a dv store the token and secret and try to when you need to get expense data as part of the , call the get expenses method from that, way of handling it when they aren't valid or generating ones when they aren't valid, like a try catch block, api will throw exception if the token and secret you're trying to use haven't been authorized by the any user account, use that exception to show error message, try using authapi instance to generate another token and secret and get the url
// have token and secret returned from getUrl function as well, store on client side, using token and secret will probably have to be server side, all that will be done on client side will be returning url and data
// after you authenticate the token and secret can probably store it server side or just store it client side and then just have it sent to the server for each request for the server to then instantiate the splitwise api, after generate auth token and secret and the url, return all of those sent back to the client side and then once the client side authenticates, store the token and secret client side, eg local storage or the state of a component and send back to tserver whenever you need to use a route that needs to integrate with splitwise, use that to instantiate the splitwise api and then get the information for that account
