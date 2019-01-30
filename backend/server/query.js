const express = require('express');
const { User, Post } = require('../models/user');

const checkAuth = require("../middleware/check-auth");
const jwt = require("jsonwebtoken");

const router = express.Router();


router.post("/f", (req, res) => {
  let userF = User.find({ gjinia: "F" })
    .then(user => {
      if (!user) {
        // return res.status(501).json(
        //    {message : "Not found!"}
        //
        // );
        return res.json(user);
      }
      else
        res.json(user);
    })

});
router.post("/name", (req, res) => {
  let userF = User.find({}, { emer: 1, _id: 0, mosha: 1, mbimer: 1 })
    .then(user => {
      if (!user) {
        // return res.status(501).json(
        // {message : "Not found!"}
        //
        // );
        return res.json(user);
      }
      else
        res.json(user);
    })

});
router.post("/m", (req, res) => {
  let userm = User.find({ gjinia: "M" })
    .then(user => {
      if (!user) {
        // return res.status(501).json(
        //  {message : "Not found!"}
        // );
        return res.json(user);
      }
      else
        res.json(user);
    })
});


router.post("/cm", (req, res) => {
  User.find({ gjinia: "M" }).count().then(user => {
    if (!user) {
      // return res.status(501).json(
      //  {message : "Not found!"}
      // );
      return res.json(user);
    }
    else
      res.json(user);
  })
});


router.post("/cf", (req, res) => {
  User.find({ gjinia: "F" }).count().then(user => {
    if (!user) {
      // return res.status(501).json(
      //  {message : "Not found!"}
      //   );
      return res.json(user);
    }
    else
      res.json(user);
  })
});

router.post("/postautor", (req, res) => {
  // let autor =req.userData.userId;
  Post.find({}, { author: 1 })
    .then(post => {
      if (!post) {
        // return res.status(501).json(
        //   {message : "Not found!"}
        //       );
        return res.json(post);
      }
      else
        res.json(post);
    })

});

router.post("/postbyusers", (req, res) => {

  Post.aggregate([
    {
      $lookup:
      {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "posts_docs"
      }
    }
  ]).then(post => {
    if (!post) {
      // return res.status(501).json(
      //  {message : "Not found!"}
      //       );
      return res.json(post);
    }
    else
      res.json(post);
  })

});

router.post("/poststatus", (req, res) => {
  Post.find({ status: "Done" })
    .then(post => {
      if (!post) {
        // return res.status(501).json(
        // {message : "Not found!"}
        //       );
        return res.json(post);
      }
      else
        res.json(post);
    })

});
router.post("/severity", (req, res) => {
  Post.distinct("severity")
    .then(post => {
      if (!post) {
        // return res.status(501).json(
        //   {message : "Not found!"}
        //       );
        return res.json(post);
      }
      else
        res.json(post);
    })

});
router.post('/countHigh', (req, res) => {
  Post.find({ severity: 'High' }).count()
    .then(post => {
      if (!post) {
        // return res.status(501).json(
        // {message : "Not found!"}
        //       );

        return res.json(post);
      }
      else
        res.json(post);
    })
});
router.post('/countMedium', (req, res) => {
  Post.find({ severity: 'Medium' }).count()
    .then(post => {
      if (!post) {
        // return res.status(501).json(
        //  {message : "Not found!"}
        //       );
        return res.json(post);
      }
      else
        res.json(post);
    })
});
router.post('/countLow', (req, res) => {
  Post.find({ severity: 'Low' }).count()
    .then(post => {
      if (!post) {
        // return res.status(501).json(
        // {message : "Not found!"}
        //       );
        return res.json(post);
      }
      else
        res.json(post);
    })
});
router.post('/countOpen', (req, res) => {
  Post.find({ status: 'Open' }).count()
    .then(post => {
      if (!post) {
        // return res.status(501).json(
        // {message : "Not found!"}
        //       );
        return res.json(post);
      }
      else
        res.json(post);
    })
});
router.post('/countDone', (req, res) => {
  Post.find({ status: 'Done' }).count()
    .then(post => {
      if (!post) {
        // return res.status(501).json(
        // {message : "Not found!"}
        //       );
        return res.json(post);
      }
      else
        res.json(post);
    })
});
router.post('/countProgress', (req, res) => {
  Post.find({ status: 'In Progress' }).count()
    .then(post => {
      if (!post) {
        // return res.status(501).json(
        // {message : "Not found!"}
        //       );
        return res.json(post);
      }
      else
        res.json(post);
    })
});
module.exports = router;
