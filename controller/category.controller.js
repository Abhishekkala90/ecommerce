let Categories = require("./../model/category");
let sequelizeInstance = require("./../config/db.config");
let express = require("express");
let expressApp = express();

// let getAllCategories =(req,res,next)=>{res.write("this is for category ");
// res.end()}; now we need to fetch data so see below.

let getAllCategories = async (req, res, next) => {
  let categories = await Categories.findAll(); //we will send this to  client or ui
  res.status(200).json(categories); //This syntax is very important  it means status 200 means success and the content is JSON.
};

//ui will call router which call controller which in turn call model which call sql connection(database)

let getCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;
  let categories = await Categories.findAll({
    where: {
      id: id,
    },
  });
  if (!id) {
    res.status(400).send("ID is not passed");
  }
  res.send(JSON.stringify(categories));
};

let addNewCategory = async (req, res, next) => {
  try {
    let categoryToAdd = req.body;
    await Categories.create(categoryToAdd);
    res.status(201).send("New category added");
  } catch (err) {
    // res.status(400).send("Cannot perform this action")  //This syntax saves program from crashing it just catches the error if error occurs.try is mandatory.
    next(err);
    //it is giving the error inside the console still not breaking the code.
    //next is used to direct to next route.
  } finally {
    res.end();
  }
};

let deleteCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;
  await Categories.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).send("Category Removed");
  res.end();
};

let updateCategoryById = async (req, res, next) => {
  // if(!req.body.name){
  //     res.status(500).send("Please pass category name");
  //     res.end();
  // }
  let id = req.params.categoryId;
  let categoryToUpdate = req.body;
  await Categories.update(categoryToUpdate, {
    where: {
      id: id,
    },
  });
  let updatedCategory = await Categories.findByPk(id);
  res.status(200).send(updatedCategory);
};
//body-parser middleware to get the body for post api calls

//they are invoked once then commented to generate table and to fill data. so, we don't need to call them again.
let all = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  deleteCategoryById,
  updateCategoryById,
};
module.exports = all;
