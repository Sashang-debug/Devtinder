const express = require('express');
const profilerouter = express.Router();
const userauth = require("../Middleware/auth");

profilerouter.get("/profile",userauth,async(req,res)=>{
   try{
        const user = req.user;
        res.send("User Profile: "+user);
   }catch(err){
    res.status(500).send("Something went wrong!");
   }
})

module.exports = profilerouter;