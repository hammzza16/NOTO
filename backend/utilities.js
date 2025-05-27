const jwt = require("jsonwebtoken");
const axios = require("axios");

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

async function summarizeText(text) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
        },
        timeout: 30000,
      }
    );

    // Response can be an array or an object depending on model status
    if (Array.isArray(response.data) && response.data[0]?.summary_text) {
      return response.data[0].summary_text;
    }
    if (response.data.summary_text) {
      return response.data.summary_text;
    }

    // Model may be loading or return an error
    if (response.data.error) {
      return "Model is loading or unavailable. Please try again in a few seconds.";
    }

    return "No summary available.";
  } catch (err) {
    console.error(
      "HuggingFace summarization error:",
      err.response?.data || err.message
    );
    return "Error generating summary.";
  }
}

module.exports = {
  authenticateToken,
  summarizeText,
};
