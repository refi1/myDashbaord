import mongoose from "mongoose";
const uniqueValidor = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  emer: {
    type: String,
    required: true
  },
  mbimer: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gjinia: {
    type: String,
    default: "F",
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  shteti: {
    type: String,
    required: true
  },
  qyteti: {
    type: String,
    required: true
  },
  mosha: {
    type: Number,
    min: 0,
    max: 80,
    required: true
  }
});

userSchema.plugin(uniqueValidor);

const postSchema = new Schema({
  title: {
    type: String
  },
  responsible: { type: String },
  description: {
    type: String
  },
  severity: {
    type: String
  },
  status: {
    type: String,
    default: "Waiting"
  },
  author: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }]
});

const dashbaordSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  chart: {
    type: String,
    default: "pie"
  },
  data: {
    type: Array,
    default: []
  },
  label: {
    type: Array,
    default: []
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  cols: {
    type: Number,
    required: true
  },
  rows: {
    type: Number,
    required: true
  },
  authordashboard: [
    { type: Schema.Types.ObjectId, required: true, ref: "User" }
  ]
});
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
const Dashboard = mongoose.model("Dashboard", dashbaordSchema);

module.exports = {
  User: User,
  Post: Post,
  Dashboard: Dashboard
};
