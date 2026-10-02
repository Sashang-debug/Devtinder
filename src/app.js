const express = require("express");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");

const {connectdb} = require("./Config/database");

const User = require("./Models/user");

const {validateSignUpData} = require("./Utils/validation");

const userauth = require("./Middleware/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup",async (req,res)=>{
    try{
        validateSignUpData(req);

        const {password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        console.log("Password Hash: ",passwordHash);

        const user = new User({...req.body,password:passwordHash});
        await user.save();
        res.send("Inserted Succesfully.")
    }catch(err){
        console.log("Error: ",err);
        res.status(500).send("Something went wrong!")
    }
})

app.post("/login",async(req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId});
        if(!user){
            throw new Error("User not found.");
        }
        const isPasswordMatch = await user.validatePassword(password);
        if(isPasswordMatch){
           const token = await user.getJWT();
           console.log("Token: ",token);
           res.cookie("token",token,{expires:new Date(Date.now()+  7 * 24 * 60 * 60 * 1000)});
           res.send("Login Succesfully.");
        }else{
            res.status(400).send("Invalid credentials.");
        }
    }catch(err){
        res.status(500).send("Something went wrong!")
    }
})

app.get("/profile",userauth,async(req,res)=>{
   try{
        const user = req.user;
        res.send("User Profile: "+user);
   }catch(err){
    res.status(500).send("Something went wrong!");
   }
})

app.post("/sendconnectionrequest",userauth,async(req,res)=>{
    const user = req.user;
    console.log("Send connection request API is called by user: ",user.firstName);
    res.send("Connection request sent successfully.");
})

console.log("Trying to connect to database...");
connectdb().then(()=>{
    console.log("database is connected succesfully.");
    app.listen(3000,()=>{
     console.log("Server is listening on 3000");
    });

}).catch(err => {
    console.error("Databse cannot be connected.");
})

