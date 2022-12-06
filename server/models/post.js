const { INTEGER } = require("sequelize");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  post: sequelize.define("post", {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    privateStatus: DataTypes.BOOLEAN,
  }),
};
