const dbconnection = require("../config/db.config");
const sequelize = require("sequelize");
const user = dbconnection.define(
  "users",
  {
    username: {
      type: sequelize.DataTypes.STRING,
    },
    email: {
      type: sequelize.DataTypes.STRING,
    },

    password: {
      type: sequelize.DataTypes.STRING,
    },
  },
  { timestamps: false }
);
module.exports = user;
