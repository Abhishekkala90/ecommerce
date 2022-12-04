let sequelize = require("sequelize");
let dbconnection = require("./../config/db.config");
let categoryModel = dbconnection.define(
  "categories",
  {
    id: {
      primaryKey: true,
      type: sequelize.DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      type: sequelize.DataTypes.STRING,
    },
  },
  { timestamps: false }
);
module.exports = categoryModel;
