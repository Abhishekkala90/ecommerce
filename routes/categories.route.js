let express = require("express");
let categoryController = require("./../controller/category.controller");
let requiestValidator = require("../middlewares/RequestValidator");
let categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);

categoryRouter.get(
  "/:categoryId",
  [requiestValidator.validateReqForCategoryId],
  categoryController.getCategoryById
);

categoryRouter.post(
  "/",
  [requiestValidator.validateReqForCategoryName],
  categoryController.addNewCategory
);

categoryRouter.delete(
  "/:categoryId",
  [requiestValidator.validateReqForCategoryId],
  categoryController.deleteCategoryById
);

categoryRouter.put(
  "/:categoryId",
  [requiestValidator.validateReqForCategoryName],
  categoryController.updateCategoryById
);

module.exports = categoryRouter;
