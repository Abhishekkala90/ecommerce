const express=require('express');
const bodyParser=require('body-parser');
const serverConfig=require('./config/server.config');
const router=require("./routes/index");
const ErrorHandler=require('./middlewares/ErrorHandler');
 const app=express();
 app.use(bodyParser.json());
app.use(router);
app.use(ErrorHandler);//.use method is a way to use middlewares errorHandler middleware is always written in the last of the middlewares.

 app.listen(serverConfig.PORT,()=>{console.log("server listening on port"+serverConfig.PORT)});  

 //try catch=>first try block executes then catch block if(err) then finally block executes finally blocks always executes.Try k ander try catch condition is possible it called nested try and catch.Try always comes with catch block otherwise it will cause an compile time error.

