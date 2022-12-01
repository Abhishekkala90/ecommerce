let sequelize = require("sequelize");
let dbconnection = require("./../config/db.config");
let categoryModel = dbconnection.define("categories", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: sequelize.DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    allowNull: false,
    type: sequelize.DataTypes.STRING,
  },
});
module.exports = categoryModel;
