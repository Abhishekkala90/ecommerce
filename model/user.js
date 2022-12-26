const dbconnection = require("../config/db.config");
const sequelize = require("sequelize");
const user = dbconnection.define(
  "users",
  {
    username: {
      type: sequelize.STRING,
    },
    email: {
      type: sequelize.STRING,
    },

    password: {
      type: sequelize.STRING,
    },
  },
  { timestamps: false }
);
module.exports = user;
