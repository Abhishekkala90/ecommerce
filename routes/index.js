let express = require("express");
let categoryController = require("./../controller/category.controller");
let router = express.Router();
let categoryRoute = require("./categories.route");
let productsRoute = require("./products.route");
let authRoute = require("./auth.route");

//Base routes for categories is already defined so writing again categories you have to write two times the route categories same reason for products route...
router.use("/ecomm/api/v1/categories", categoryRoute);
router.use("ecomm/api/v1/products", productsRoute);
router.use("/ecomm/api/v1/auth", authRoute);

router.get("/", (req, res, next) => {
  res.write("this is the base page");
  res.end();
});

module.exports = router;
