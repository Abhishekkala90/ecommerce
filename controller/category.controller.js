let getAllCategories =(req,res,next)=>{res.write("this is for category ");
res.end()};

//ui will call controller which in turn will open sql connection(database)

let getCategoryById= (req,res,next)=>{res.write("this is for category "+req.params.categoryId);
res.end()};

module.exports={getAllCategories,getCategoryById};