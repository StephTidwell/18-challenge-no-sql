const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const errorMiddleware = require("./middlewares/errorMiddleware");

require("dotenv").config();

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Set up middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(helmet()); // Add security-related HTTP headers to responses
app.use(morgan("common")); // Log HTTP requests to the console

// Route for user-related functionality
app.use("/api/users", userRoute);

// Route for authentication-related functionality
app.use("/api/auth", authRoute);

// Route for post-related functionality
app.use("/api/posts", postRoute);

// Route for the homepage
app.get("/", (req, res) => {
  res.send("Welcome to Friendbook");
});

// Middleware for error handling
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT || 8801;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
