const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require('uuid');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample user data (In a real app, this would come from a database)
const users = [
  {
    additionalUserInfo: {
      providerId: "google.com",
    },
    user :{
        displayName : "",
        email : "" ,
        photoURL : "",
        uid : ""
    }
  },
];

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Route to register a new user
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);

  res.status(201).send({ message: "User registered successfully" });
});

// Route to log in a user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).send("User not found");

  // Compare the password with the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  // Generate JWT token
  const token = generateToken(user);

  res.status(200).send({ message: "Login successful", token });
});

// Protected route that requires a valid JWT token
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).send("Token required");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");

    // Access granted to protected resource
    res.status(200).send(`Welcome, user ${decoded.id}`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
