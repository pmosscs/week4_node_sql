require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

//========middleware?=============
const { register, login } = require("./controllers/auth");
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");

const { isAuthenticated } = require("./middleware/isAuthenticated");

//=============endpoints============
app.post("/register", register);
app.post("/login", login);
app.get("/posts", getAllPosts);
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

//==============server==============
app.listen(3000, () => console.log("App running on 3000"));
