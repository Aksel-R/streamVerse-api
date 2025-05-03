const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUserController,
} = require("../../controller/registerNewUser");

// POST login route (changed from GET to POST)
router.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  


  // Validate inputs
  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  try {
    const response = await loginUserController(email, password);
    res.status(200).send(response); // Return successful login response
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).send({ error: "Failed to process login" });
  }
});

// POST signup route
router.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const displayName = req.body.displayName;
  

  // Validate inputs for signup
  if (!email || !password || !displayName) {
    return res
      .status(400)
      .send({ error: "Email, password, and display name are required" });
  }

  try {
    const response = await registerUser(email, password, displayName);
    res.status(201).send(response); // Return response after successful registration
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).send({ error: "Failed to process signup" });
  }
});

module.exports = router;
