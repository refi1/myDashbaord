const express = require("express");
const { User, Post } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
const mongoose = require("mongoose");

const router = express.Router();

// Get all users from DB==================================================================

router.route("/all").get((req, res) => {
  User.find((err, user) => {
    if (err) console.log(err);
    else res.json(user);
  });
});
// Find user by id in  DB==================================================================

router.route("/:id").get((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) console.log(err);
    else res.json(user);
  });
});
// Login TO DB==================================================================
let fetchedUser;
router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Email is not correct!"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Password is not correct!"
        });
      }

      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
});

// Add user TO DB==================================================================

router.route("/add").post((req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      let useri = new User({
        emer: req.body.emer,
        mbimer: req.body.mbimer,
        password: hash,
        gjinia: req.body.gjinia,
        email: req.body.email,
        shteti: req.body.shteti,
        qyteti: req.body.qyteti,
        mosha: req.body.mosha
      });
      useri._id = new mongoose.Types.ObjectId();

      useri
        .save()
        .then(useri => {
          res.status(201).json({ message: "Added successfully." });
        })
        .catch(err => {
          res.status(500).json({
            message:
              "This email address has been taken! Please choose another email address."
          });
        });
    })
    .catch(err => {
      res.status(400).json({
        message: "Failed to create new account!."
      });
    });
});
// Update users in DB==================================================================

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user) return next(new Error("Could not load document"));
    else {
      user.emer = req.body.emer;
      user.mbimer = req.body.mbimer;
      user.password = req.body.password;
      user.gjinia = req.body.gjinia;
      user.email = req.body.email;
      user.shteti = req.body.shteti;
      user.qyteti = req.body.qyteti;
      user.mosha = req.body.mosha;
      user
        .save()
        .then(user => {
          res.status(200).json({ message: "Update done" });
        })
        .catch(err => {
          res.status(500).json({
            message: "Update failed!"
          });
        });
    }
  });
});
// DELETE users from  DB==================================================================

router.route("/delete/:id").get((req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }, (err, user) => {
    if (err) res.status(500).json({ message: "Delete failed!" });
    else res.status(200).json({ message: "Remove successfully" });
  });
});

module.exports = router;
