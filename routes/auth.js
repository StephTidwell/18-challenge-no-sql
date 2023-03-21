const router = require("express").Router(); // Import Router module from Express
const User = require("../models/User"); // Import User model from ../models/User.js
const bcrypt = require("bcrypt"); // Import bcrypt module for password hashing

// Route for user registration
router.post("/register", async (req, res) => {
  try {
    // Generate new password hash using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user object with the provided user data and hashed password
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the new user object to the database and return a success response with the saved user data
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    // Find the user with the provided email in the database
    const user = await User.findOne({ email: req.body.email });

    // Return a 404 response if the user does not exist
    !user && res.status(404).json("user not found");

    // Use bcrypt to compare the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // Return a 400 response if the password is incorrect
    !validPassword && res.status(400).json("wrong password");

    // Return a success response with the user data
    res.status(200).json(user);
  } catch (err) {
    // Return a 500 response if there is an error
    res.status(500).json(err);
  }
});

module.exports = router; // Export the router object for use in other files
