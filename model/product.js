let sequelize = require("sequelize");
let dbconnection = require("./../config/db.config");
let productModel = dbconnection.define("products", {
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

  price: {
    allowNull: false,
    type: sequelize.DataTypes.INTEGER,
  },
  categoryId: {
    allowNull: false,
    type: sequelize.DataTypes.INTEGER,
  },
});
module.exports = productModel;
