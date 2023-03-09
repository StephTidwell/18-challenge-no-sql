const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/social-network-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
      () => {
        console.log("Connected to DB");
      };
  } catch (err) {
    console.log("error: " + err);
  }
})();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});

app.listen(8801, () => {
  console.log("Listening on port 8801");
});
