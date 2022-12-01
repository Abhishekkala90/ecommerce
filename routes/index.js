let express = require("express");
let categoryController = require("./../controller/category.controller");
let router = express.Router();
let categoryRoutes = require("./categories.route");
let productsRoutes = require("./products.route");

//Base routes for categories is already defined so writing again categories you have to write two times the route categories same reason for products route...
router.use("/categories", categoryRoutes);
router.use("/products", productsRoutes);

router.get("/", (req, res, next) => {
  res.write("this is the base page");
  res.end();
});

module.exports = router;
