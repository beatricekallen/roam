var AuthApi = require("splitwise-node");
require("dotenv").config();

let userOAuthToken, userOAuthTokenSecret;

const authApi = new AuthApi(
  process.env.CONSUMER_KEY,
  process.env.CONSUMER_SECRET
);

async function getUrl() {
  var userOAuthToken, userOAuthTokenSecret;
  var authApi = new AuthApi(
    process.env.CONSUMER_KEY,
    process.env.CONSUMER_SECRET
  );
  var userAuthUrl = await authApi
    .getOAuthRequestToken()
    .then(({ token, secret }) => {
      [userOAuthToken, userOAuthTokenSecret] = [token, secret];
      return authApi.getUserAuthorisationUrl(token);
    });
  console.log(userAuthUrl);
  var splitwiseApi = authApi.getSplitwiseApi(
    userOAuthToken,
    userOAuthTokenSecret
  );
  return splitwiseApi;
}

module.exports = getUrl;
