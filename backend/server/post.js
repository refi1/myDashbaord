const express = require("express");
const { User, Post } = require("../models/user");

const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

// Get all post from DB==================================================================

router.route("/all").get((req, res) => {
  Post.find((err, posts) => {
    if (err) console.log(err);
    else res.json(posts);
  });
});
// Get post by id from DB==================================================================

router.route("/:id").get((req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) console.log(err);
    else res.json(post);
  });
});

// Add posts  TO DB==================================================================
router.route("/add").post(checkAuth, (req, res, next) => {
  let post = new Post({
    responsible: req.body.responsible,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    severity: req.body.severity,
    author: req.userData.userId
  });

  post
    .save()
    .then(post => {
      res.status(200).json({ message: "Added successfully" });
    })
    .catch(err => {
      res.status(500).send({ message: "Failed to create new post" });
    });
});
// Update posts in DB==================================================================

router.route("/update/:id").post(checkAuth, (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (!post) return next(new Error("Could not load document!"));
    else {
      post.responsible = req.body.responsible;
      post.title = req.body.title;
      post.description = req.body.description;
      post.status = req.body.status;
      post.severity = req.body.severity;
      if (post.author != req.userData.userId) {
        res.status(401).send("Not authorized!");
      } else {
        post
          .save()
          .then(post => {
            res.status(200).json({ message: "Update done!" });
          })
          .catch(err => {
            res.status(500).send({ message: "Update failed!" });
          });
      }
    }
  });
});
// DELETE posts from DB==================================================================

router.route("/delete/:id").get(checkAuth, (req, res) => {
  Post.deleteOne({ _id: req.params.id, author: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
});

module.exports = router;
