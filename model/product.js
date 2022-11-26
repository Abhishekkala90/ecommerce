let sequelize=require('sequelize');
let dbconnection=require('./../config/db.config');
let productModel=dbconnection.define("products",{
    id:{
        primaryKey:true,
        notnull:true,
        type:sequelize.DataTypes.INTEGER,
        autoIncrement:true
    },
    name:{
        notNull:true,
        type:sequelize.DataTypes.STRING
    },

price:{
    notnull:true,
    type:sequelize.DataTypes.INTEGER,
},
      categoryId:{
        notnull:true,
        type:sequelize.DataTypes.INTEGER,
}})  
module.exports=productModel;