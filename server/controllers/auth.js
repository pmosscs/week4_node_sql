require("dotenv").config();
const { SECRET } = process.env;
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createWebToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const foundUser = await User.findOne({ where: { username } });
      if (foundUser) {
        res.sendStatus(200).send("User already exists");
      } else {
        ///register a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          username: username,
          hashedPass: hash,
        });
        console.log(newUser);
        const token = createWebToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        console.log("Token is ", token);
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token,
          exp,
        });
      }
    } catch (error) {
      console.log("errors on the register try", error);
      res.sendStatus(400);
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      ///test good
      const foundUser = await User.findOne({ where: { username } });
      //found user test good
      if (foundUser) {
        //if statement entered
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );
        //isauthenticated is true
        if (isAuthenticated) {
          const token = createWebToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );
          //token made
          const exp = Date.now() + 1000 * 60 * 60 * 48;
          //exp made
          res.status(200).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            token,
            exp,
          });
        } else {
          res.status(400).send("cannot log in 1");
        }
      } else {
        res.status(400).send("cannot log in 2");
      }
    } catch (error) {
      console.log("error on the login try");
      console.log(error);
      res.sendStatus(400);
    }
  },
};
