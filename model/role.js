const dbconnection = require("../config/db.config");
const sequelize = require("sequelize");
const role = dbconnection.define(
  "roles",
  {
    id: {
      type: sequelize.DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: sequelize.DataTypes.STRING,
    },
  },
  { timestamps: false }
);
module.exports = role;
