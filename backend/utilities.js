const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Targeting the authorization header
  // The authorization header is in the format
  const token = authHeader && authHeader.split(" ")[1]; // Splitting the header to get the token
  // The token is the second part of the header, after the space

  if (!token) return res.sendStatus(401); // If there is no token, return 401 Unauthorized

  // If there is a token, verify it using the secret key
  // The secret key is stored in the environment variable ACCESS_TOKEN_SECRET
  // The verify function takes the token, the secret key, and a callback function
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
