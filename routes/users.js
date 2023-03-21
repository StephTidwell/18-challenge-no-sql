const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Route for testing the user route
router.get("/", (req, res) => {
  res.send("hey its user route");
});

// Update user
router.put("/:id", async (req, res) => {
  // Check if user ID matches with request body user ID or if request body isAdmin is true
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // If request body password exists, hash the password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    // Find user by ID and update their information
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  // Check if user ID matches with request body user ID or if request body isAdmin is true
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // Find user by ID and delete their account
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

// Find a user
router.get("/:id", async (req, res) => {
  try {
    // Find user by ID and exclude password and updatedAt fields from the returned document
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Follow a user
router.put("/:id/follow", async (req, res) => {
  // Check if request body userId and params id are not the same
  if (req.body.userId !== req.params.id) {
    try {
      // Find the user to be followed and the current user
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // If the current user is not already following the user, update both users' followings and followers arrays
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json(req.params.id + " has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

// Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  // Check if request body userId and params id are not the same
  if (req.body.userId !== req.params.id) {
    try {
      // Find the user to be unfollowed and the current user
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // If the current user is already following the user, update both users' followings and followers arrays
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json(req.params.id + " has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});
// Get the user's followings
router.get("/:id/followings", async (req, res) => {
  try {
    // Find user by ID and populate followings array with user objects
    const user = await User.findById(req.params.id);
    const followings = await Promise.all(
      user.followings.map((followingId) => {
        return User.findById(followingId);
      })
    );
    res.status(200).json(followings);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get the user's followers
router.get("/:id/followers", async (req, res) => {
  try {
    // Find user by ID and populate followers array with user objects
    const user = await User.findById(req.params.id);
    const followers = await Promise.all(
      user.followers.map((followerId) => {
        return User.findById(followerId);
      })
    );
    res.status(200).json(followers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
