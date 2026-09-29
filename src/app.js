const express = require("express");

const app = express();//New serevr created.

app.use("/",(req,res)=>{
    res.send("Dashboard");
})

app.use("/test",(req,res)=>{
    res.send("Hello Jee");
})

//server is listening on port 3000.
app.listen(3000,()=>{
    console.log("Server is listening on 3000");
});