let Products=require("./../model/product");
let sequelizeInstance=require("./../config/db.config");

let createTable=async ()=>{
    await sequelizeInstance.sync();
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
   // createTable();
    //   insertProducts();
   
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


module.exports={getAllProducts,getProductById};