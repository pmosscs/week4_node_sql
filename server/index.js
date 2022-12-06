require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { PORT } = process.env;

const { login, logout } = require("./controllers/auth");
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");

const { isAuthenticated } = require("./middleware/isAuthenticated");
