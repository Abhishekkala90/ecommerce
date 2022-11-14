let Categories=require("./../model/category");
let sequelizeInstance=require("./../config/db.config");

let createTable=async ()=>{
    await sequelizeInstance.sync();
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
    res.writeHead(200,{'Content-Type':"application/json"});//This syntax is very important  it means status 200 means success and the content is JSON.
    res.write(JSON.stringify(categories));
    res.end();
};


//ui will call controller which in turn will open sql connection(database)

let getCategoryById= (req,res,next)=>{res.write("this is for category "+req.params.categoryId);
res.end()};
// createTable();
// insertCategories();

//they are invoked once then commented to generate table and to fill data. so, we don't need to call them again.
module.exports={getAllCategories,getCategoryById};