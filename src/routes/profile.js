const express = require('express');
const mongoose = require('mongoose');
const profilerouter = express.Router();
const userauth = require("../Middleware/auth");
const User = require("../Models/user");
const {validtaeUpadteProfileData,validatePasswordUpdateData} = require("../Utils/validation");
const bcrypt = require("bcrypt");

profilerouter.get("/profile/view",userauth,async(req,res)=>{
   try{
        const user = req.user;
        res.send("User Profile: "+user);
   }catch(err){
    res.status(500).send("Something went wrong!");
   }
})

profilerouter.patch("/profile/update",userauth,async(req,res)=>{
    try{
       const isAllowed = validtaeUpadteProfileData(req);
       if(!isAllowed){
        return res.status(400).send("Invalid fields in request body.");
       }
       const loogedinuser = req.user;
       const updatedUser = await User.findByIdAndUpdate(loogedinuser._id,req.body,{new:true});
       res.json({
        message: `${loogedinuser.firstName} ${loogedinuser.lastName}'s profile updated successfully.`,
        data: updatedUser
       });
    }catch(err){
        console.log("Error: ",err);
        res.status(500).send("Something went wrong!");
    }
})

profilerouter.patch("/profile/password",userauth,async(req,res)=>{
   try{
     const allowed = validatePasswordUpdateData(req);
     if(!allowed){
       return res.status(400).send("Invalid password.");
     }
     const user = req.user;
     const newPassword = req.body.newPassword;
     const newPasswordHash = await bcrypt.hash(newPassword,10);
     user.password = newPasswordHash;
     await user.save();
     res.send("Password updated successfully.");
   }catch(err){
    console.log("Error: ",err);
    res.status(500).send("Something went wrong!");
   }
})

module.exports = profilerouter;