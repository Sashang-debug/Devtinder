const express = require('express');
const requestrouter = express.Router();
const userauth = require("../Middleware/auth");

requestrouter.post("/sendconnectionrequest",userauth,async(req,res)=>{
    const user = req.user;
    console.log("Send connection request API is called by user: ",user.firstName);
    res.send("Connection request sent successfully.");
})

module.exports = requestrouter;