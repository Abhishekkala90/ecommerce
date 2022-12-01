let Products = require("./../model/product");
let sequelizeInstance = require("./../config/db.config");
const sequelize = require("sequelize");

const { application } = require("express");

let createTable = async () => {
  await sequelizeInstance.sync({ force: true });
  insertProducts();
  console.log("Table created succesfully");
};
let insertProducts = async () => {
  await Products.bulkCreate([
    {
      name: "Samsung Galaxy Note",
      categoryId: "1",
      price: 18000,
    },
    {
      name: "Iphone 13",
      categoryId: "1",
      price: 60000,
    },
    {
      name: "Sony Bravia",
      categoryId: "2",
      price: 40000,
    },
    {
      name: "Boat Rugged",
      categoryId: "5",
      price: 4000,
    },
    {
      name: "JBL Storm",
      categoryId: "5",
      price: 2000,
    },
    {
      name: "Vu 5",
      categoryId: "2",
      price: 32000,
    },
  ]);
};
//    createTable();

let getAllProducts = async (req, res, next) => {
  let categoryId = req.query.categoryId; //req.query is used for filter ,req.body is used for body & req.params is used for parameters passed.
  let minPrice = req.query.minPrice || 0;
  let maxPrice = req.query.maxPrice || Infinity;
  let products = [];
  if (Object.keys(req.query).length == 0) {
    products = await Products.findAll();
  } else {
    if (categoryId && !(minPrice || maxPrice)) {
      products = await filterByCategory();
    } else if (!categoryId && minPrice && maxPrice) {
      products = await filterByPrice(minPrice, maxPrice);
    } else {
      products = await Products.findAll({
        where: {
          categoryId: categoryId,
          price: { [sequelize.Op.gte]: minPrice, [sequelize.Op.lte]: maxPrice },
        },
      });
    }
  }
  res.status(200).json(products);
  //besfore send it is mandatory to send status.
};

let getProductById = async (req, res, next) => {
  let id = req.params.productId;
  let products = await Products.findAll({
    where: {
      id: id,
    },
  });
  if (!id) {
    res.status(400).send("ID is not passed");
  }
  res.send(JSON.stringify(products));
};

let filterByCategory = async (categoryId) => {
  let filteredCategory = await Products.findAll({
    where: { categoryId: categoryId },
  });
  return filteredCategory;
};

let filterByPrice = async (minPrice, maxPrice) => {
  let filteredProduct = await Products.findAll({
    where: {
      price: { [sequelize.Op.gte]: minPrice, [sequelize.Op.lte]: maxPrice },
    },
  });
  return filteredProduct;
};

const addNewProduct = async (req, res, next) => {
  try {
    let ProductToAdd = req.body;
    await Products.create(ProductToAdd);
    res.status(201).send("New Product added");
  } catch (err) {
    // res.status(400).send("Cannot perform this action")  //This syntax saves program from crashing it just catches the error if error occurs.try is mandatory.
    next(err);
    //it is giving the error inside the console still not breaking the code.
    //next is used to direct to next route.
  } finally {
    res.end();
  }
};

let deleteProductById = async (req, res, next) => {
  let id = req.params.productId;
  await Products.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).send("Product Removed");
  res.end();
};

let updateProductById = async (req, res, next) => {
  let id = req.params.productId;
  let update = [req.body.name, req.body.price, req.body.categoryId];
  let productToUpdate = {
    name: update[0],
    price: update[1],
    categoryId: update[2],
  };
  await Products.update(productToUpdate, {
    where: {
      id: id,
    },
  });
  let updatedProduct = await Products.findByPk(id);
  res.status(200).send(updatedProduct);
};
const all = {
  getAllProducts,
  getProductById,
  addNewProduct,
  deleteProductById,
  updateProductById,
};
module.exports = all;
