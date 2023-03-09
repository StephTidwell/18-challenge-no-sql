const { Post, User } = require("../models");

const postController = {
  //get all posts
  getAllPosts(req, res) {
    Post.find({})
      .populate({
        path: "user",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get one post by id
  getPostById({ params }, res) {
    Post.findOne({ _id: params.id })
      .populate({
        path: "user",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbPostData) => {
        //if no post found send 404
        if (!dbPostData) {
          res.status(404).json({ message: "No Post found with this id!" });
          return;
        }
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // add post to user
  addPost({ params, body }, res) {
    console.log(body);
    Post.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { posts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //update a post by id
  updatePost({ params, body }, res) {
    Post.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedPost) => {
        if (!updatedPost) {
          res.status(404).json({ message: "No post found with this id!" });
          return;
        }
        res.json(updatedPost);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete post
  removePost({ params }, res) {
    Post.findOneAndDelete({ _id: params.id })
      .then((deletedPost) => {
        if (!deletedPost) {
          return res.status(404).json({ message: "No post with this id!" });
        }
        res.json(deletedPost);
      })
      .catch((err) => res.json(err));
  },

  //add a reaction to a post
  addReaction({ params, body }, res) {
    Post.findOneAndUpdate(
      { _id: params.postId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id! " });
          return;
        }
        res.json(dbPostData);
      })
      .catch((err) => res.json(err));
  },

  //delete a reaction
  removeReaction({ params }, res) {
    Post.findOneAndUpdate(
      { _id: params.postId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => res.json(err));
  },
};

module.exports = postController;
