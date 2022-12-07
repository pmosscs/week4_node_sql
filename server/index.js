require("dotenv").config();
const { sequelize } = require("./util/database");

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

const { User } = require("./models/user");
const { Post } = require("./models/post");

User.hasMany(Post);
Post.belongsTo(User);

//=============endpoints============
app.post("/register", register);
app.post("/login", login);
app.get("/posts", getAllPosts);
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

//==============server==============
sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log("***db sync successful and server running on 3000***")
  );
});
