const express = require("express");
const sequelize = require("sequelize");
const bodyParser = require("body-parser");
const serverConfig = require("./config/server.config");
const dbconnection = require("./config/db.config");
const Categories = require("./model/category");
const Products = require("./model/product");
const Roles = require("./model/role");
const router = require("./routes/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
const app = express();
app.use(bodyParser.json());
app.use(router);
app.use(ErrorHandler); //.use method is a way to use middlewares errorHandler middleware is always written in the last of the middlewares.
let init = async () => {
  await dbconnection.sync({ force: true }); //sync is used to create table.
  insertCategories();
  insertRoles();
};
let insertCategories = async () => {
  await Categories.bulkCreate([
    {
      name: "Fashion",
    },
    {
      name: "Mobile",
    },
    {
      name: "Electronics",
    },
    {
      name: "Appliances",
    },
  ]);
};
let insertRoles = () => {
  Roles.bulkCreate([
    {
      id: 1,
      name: "user",
    },
    {
      id: 2,
      name: "admin",
    },
  ]);
};

app.listen(serverConfig.PORT, () => {
  console.log("server listening on port" + serverConfig.PORT);
});
Categories.hasMany(Products);
init();
//try catch=>first try block executes then catch block if(err) then finally block executes finally blocks always executes.Try k ander try catch condition is possible it called nested try and catch.Try always comes with catch block otherwise it will cause an compile time error.

//Note:filter is passed using eg=>
//localhost:8080/categories?id=5.
//why filter is passed in backend not in frontend...we can also do it frontEnd but it is not a good practice.. suppose, we to find a product out of 100000000 products this filter will take a lot of time also the front end runs on webbrowser which runs on client machine which usually not so powerful so the web site will be very slow but doing it in backend the code will run on server which very very powerful compared to clients machine also in backend we can choose a targeted filter which save a lot of time and website will be fast also the performance will be client machine independent.
