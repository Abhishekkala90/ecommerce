let express=require('express');
let categoryController=require('./../controller/category.controller');
let categoryRouter=express.Router();



categoryRouter.get('/',categoryController.getAllCategories);

categoryRouter.get('/:categoryId',categoryController.getCategoryById);

categoryRouter.post('/',categoryController.addNewCategory);

categoryRouter.delete('/:categoryId',categoryController.deleteCategoryById);


module.exports=categoryRouter;
  