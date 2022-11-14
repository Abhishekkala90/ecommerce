const express=require('express');
const serverConfig=require('./config/server.config');
const router=require("./routes/index")
 const app=express();
app.use(router);

 app.listen(serverConfig.PORT,()=>{console.log("server listening on port"+serverConfig.PORT)});