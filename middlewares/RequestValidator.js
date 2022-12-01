let Categories = require("../model/category");
const validateReqForCategoryName = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Category name is required" });
  }
  next();
};
//validator is also a middleware it is used after the route is called but before the controller.

const validateReqForCategoryId = async (req, res, next) => {
  let categoryId = req.params.categoryId;
  if (categoryId) {
    let category = await Categories.findByPk(categoryId);
    if (!category) {
      res.status(400).send({ message: "categoryId is missing" });
      return;
    }
  }
  // res.end(); to see what it does uncomment it and comment next();
  next(); //it will pass to next function
};

module.exports = { validateReqForCategoryName, validateReqForCategoryId };
