let Products=require("./../model/product");
let sequelizeInstance=require("./../config/db.config");

let createTable=async ()=>{
    await sequelizeInstance.sync({force:true});
    insertProducts();
    console.log("Table created succesfully");
}
let insertProducts=async()=>{
    await Products.bulkCreate([
       {
           name:"Samsung Galaxy Note",
           categoryId:'1',
           price:18000
       },
       {
           name:"Iphone 13",
           categoryId:'1',
           price:60000
        },
        {
            name:"Sony Bravia",
            categoryId:'2',
            price:40000
        },
        {
            name:"Boat Rugged",
        categoryId:'5',
        price:4000
    },
    {
        name:"JBL Storm",
        categoryId:'5',
        price:2000
    },
    {
        name:"Vu 5",
        categoryId:'2',
        price:32000
    }
    ]);   
   }
//    createTable();
   
let getAllProducts=async(req,res,next)=>{
   let products =await  Products.findAll();
    res.status(200,{'Content-Type':"application/json"}).send(JSON.stringify(products));
   res.end();//besfore send it is mandatory to send status.
}

let getProductById=async(req,res,next)=>{
   let id=req.params.productId;
   let products=await Products.findAll({where:{
       id:id
    }
});
if(!id){
 res.status(400).send("ID is not passed")
}
res.send(JSON.stringify(products));
}


const addNewProduct=async(req,res,next)=>{
    try{
    let ProductToAdd=[req.body.name,req.body.price,req.body.categoryId
    ];
await Products.create({
name:ProductToAdd[0],price:ProductToAdd[1],categoryId:ProductToAdd[2]
});
res.status(201).send("New Product added");
}
catch(err){
// res.status(400).send("Cannot perform this action")  //This syntax saves program from crashing it just catches the error if error occurs.try is mandatory.
next(err);
//it is giving the error inside the console still not breaking the code.
//next is used to direct to next route.
}
finally{   
res.end();
}
}

let deleteProductById=async(req,res,next)=>{let id=req.params.productId;
    await Products.destroy({
    where:{
        id:id
    }
    });
    res.status(200).send("Product Removed");
    res.end(); 
    }

    let updateProductById=async(req,res,next)=>{
   
     let id=req.params.productId;
     let update=[req.body.name,req.body.price,req.body.categoryId];
     let productToUpdate={
        name:update[0],price:update[1],categoryId:update[2]
     };
       await Products.update(productToUpdate,{where:{
            id:id
        }});
      let updatedProduct= await Products.findByPk(id);
                res.status(200).send(updatedProduct);   
    }
const all={getAllProducts,getProductById,addNewProduct,deleteProductById, updateProductById};
module.exports=all;