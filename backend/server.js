const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User, Post, Dashboard } = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("./middleware/check-auth");
const path = require("path");
const querys = require("./server/query");
const users = require("./server/user");
const posts = require("./server/post");
const dashboards = require("./server/dashboard");

const app = express();
const router = express.Router();
app.use(cors());

// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "16mb" }));
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
mongoose.connect(
  "mongodb://localhost:27017/users",
  { useNewUrlParser: true }
);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/querys", querys);
app.use("/users", users);
app.use("/posts", posts);
app.use("/dashboards", dashboards);

app.listen(4000, () => console.log("Express server running on port 4000"));
