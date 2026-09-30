const express = require("express");

const {connectdb} = require("./Config/database");

const User = require("./Models/user");

const app = express();


app.post("/singup",async (req,res)=>{
    const user = new User({
        firstName:"Sachin",
        lastName:"Tendulkar",
        emailId:"sachin345@gmail.com",
        password:"1234"
    });
    await user.save();
    res.send("Inserted Succesfully.")
})


connectdb().then(()=>{
    console.log("database is connected succesfully.");
    app.listen(3000,()=>{
     console.log("Server is listening on 3000");
    });

}).catch(err => {
    console.error("Databse cannot be connected.");
})

