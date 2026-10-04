const express = require("express");
const router = express.Router();
const { validateSignUpData } = require("../Utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

router.post("/signup",async (req,res)=>{
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

router.post("/login",async(req,res)=>{
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



module.exports = router;