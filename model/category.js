let sequelize=require('sequelize');
let dbconnection=require('./../config/db.config');
let categoryModel=dbconnection.define("categories",{
    id:{
        primaryKey:true,
        notnull:true,
        type:sequelize.DataTypes.INTEGER,
        autoIncrement:true
    },
    name:{
        notNull:true,
        type:sequelize.DataTypes.STRING
    }
})  
module.exports=categoryModel;