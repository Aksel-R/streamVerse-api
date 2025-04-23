require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Store ID in .env

const verifyGoogleIdToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authType = req.headers.auth_type;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized: Missing or invalid token");
  }

  const idToken = authHeader.split(" ")[1];

  try {
    if (authType === "google.com") {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID, // From Google Cloud Console
      });

      const payload = ticket.getPayload();

      req.user = {
        uid: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      };

      return next();
    }

    if (authType === "streamverse.com") {
      const decoded = jwt.verify(idToken, process.env.JWT_SECRET);

      req.user = {
        uid: decoded.id,
        email: decoded.email,
      };

      return next();
    }

    // If authType is neither "google" nor "streamverse.com"
    return res.status(401).send("Unauthorized: Invalid auth_type");
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).send("Unauthorized: Invalid token");
  }
};

module.exports = { verifyGoogleIdToken };
