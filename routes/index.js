let express=require('express');
let categoryController=require('./../controller/category.controller');
let router=express.Router();


router.get('/',(req,res,next)=>{res.write("this is the base page");
res.end()});

router.get('/categories',categoryController.getAllCategories);

router.get('/categories/:categoryId',categoryController.getCategoryById);

module.exports=router;
