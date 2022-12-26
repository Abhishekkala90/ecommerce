const dbconnection = require("../config/db.config");
const sequelize = require("sequelize");
const role = dbconnection.define(
  "roles",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING,
    },
  },
  { timestamps: false }
);
module.exports = role;
