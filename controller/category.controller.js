let Categories=require("./../model/category");
let sequelizeInstance=require("./../config/db.config");
let express=require('express');
let expressApp=express();

let createTable=async ()=>{
    await sequelizeInstance.sync({force:true});
    console.log("Table created succesfully");
}

  
let insertCategories=async()=>{
 await Categories.bulkCreate([
    {
        name:"Fashion"
    },
    {
        name:"Mobile"
    },
    {
        name:"Electronics"
    },
    {
        name:"Appliances"
    }
 ])   
}

// let getAllCategories =(req,res,next)=>{res.write("this is for category ");
// res.end()}; now we need to fetch data so see below.

let getAllCategories =async (req,res,next)=>{
    let categories=await Categories.findAll();//we will send this to  client or ui
    res.status(200,{'Content-Type':"application/json"}).send(JSON.stringify(categories));//This syntax is very important  it means status 200 means success and the content is JSON.
};


//ui will call router which call controller which in turn call model which call sql connection(database)

let getCategoryById= async(req,res,next)=>{let id=req.params.categoryId;
   let categories=await Categories.findAll ({where:{
        id:id
     }
 });
 if(!id){
  res.status(400).send("ID is not passed")
 }
 res.send(JSON.stringify(categories));};



let addNewCategory=async(req,res,next)=>{let categoryToAdd=req.body.name;
await Categories.create({
name:categoryToAdd
});
res.status(201).send("New category added");
res.end();
}


let deleteCategoryById=async(req,res,next)=>{let id=req.params.categoryId;
    await Categories.destroy({
    where:{
        id:id
    }
    });
    res.status(200).send("Category Removed");
    res.end();
    }
//body-parser middleware to get the body for post api calls
 
// createTable() ;
// insertCategories();

//they are invoked once then commented to generate table and to fill data. so, we don't need to call them again.
module.exports={getAllCategories,getCategoryById,addNewCategory,deleteCategoryById};