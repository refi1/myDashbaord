const express = require("express");
const { User, Post, Dashboard } = require("../models/user");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

// Get all Dashboard from DB==================================================================

router.route("/all").get((req, res) => {
  Dashboard.find((err, dashboards) => {
    if (err) console.log(err);
    else res.json(dashboards);
  });
});
// Get Dashboard by id from DB==================================================================

router.route("/:id").get((req, res) => {
  Dashboard.findById(req.params.id, (err, dashboards) => {
    if (err) console.log(err);
    else res.json(dashboards);
  });
});

// Add dashboards  TO DB==================================================================

router.route("/add").post(checkAuth, (req, res) => {
  let dashboards = new Dashboard({
    chart: req.body.chart,
    data: req.body.data,
    label: req.body.label,
    x: req.body.x,
    y: req.body.y,
    rows: req.body.rows,
    cols: req.body.cols,
    authordashboard: req.userData.userId
  });
  dashboards._id = new mongoose.Types.ObjectId();

  dashboards
    .save()
    .then(dashboards => {
      res.status(200).json({ message: "Added successfully" });
    })
    .catch(err => {
      res.status(500).send({ message: "Failed to create new Dashboard" });
    });
});
// Update dashboards in DB==================================================================

router.route("/update/:id").post(checkAuth, (req, res, next) => {
  Dashboard.findById(req.params.id, (err, dashboards) => {
    if (!dashboards) return next(new Error("Could not load document!"));
    else {
      dashboards.x = req.body.x;
      dashboards.y = req.body.y;
      dashboards.rows = req.body.rows;
      dashboards.cols = req.body.cols;
      dashboards.chart = req.body.chart;
      dashboards.data = req.body.data;
      dashboards.label = req.body.label;

      if (dashboards.authordashboard == req.userData.userId) {
        // res.status(401).json({ message: "Not authorized!" });
       
        // } else {
        dashboards
          .save()
          .then(dashboards => {
            res.status(200).json({ message: "Update done!" });
          })
          .catch(err => {
            res.status(500).send({ message: "Update failed!" });
          });
      }
    }
  });
});

router.route("/delete/:id").get(checkAuth, (req, res) => {
  Dashboard.deleteOne(
    { _id: req.params.id, authordashboard: req.userData.userId },
    (err, user) => {
      if (err) res.status(500).json({ message: "Delete failed!" });
      else res.status(200).json({ message: "Remove successfully" });
    }
  );
});

module.exports = router;
