const express = require('express');
const requestrouter = express.Router();
const userauth = require("../Middleware/auth");
const User = require("../Models/user");
const connectionRequestModel = require("../Models/connectionRequest");

requestrouter.post("/request/send/:status/:toUserId",userauth,async(req,res)=>{
     try{
        const fromUserId = req.user.id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatuses = ["ignore","interested"];
        if(!allowedStatuses.includes(status)){
            return res.status(400).json({message:"Invalid status. Status must be either ignore or interested."})
        }
        const validtoUser = await User.findById(toUserId);
        if(!validtoUser){
            return res.status(404).json({message:"User not found."});
        }
        const request = await connectionRequestModel.findOne({ $or: [{ fromUserId: fromUserId, toUserId: toUserId }, { fromUserId: toUserId, toUserId: fromUserId }] });

        if (request) {
            return res.status(400).json({ message: "Request already sent or received." });
        }
        if(fromUserId === toUserId){
            return res.status(400).json({message:"You cannot send request to yourself."})
        }
        const connectionRequset = new connectionRequestModel({
            fromUserId:fromUserId,
            toUserId:toUserId,
            status:status
        })
        const savedRequest = await connectionRequset.save();
        const fromUser = req.user.firstName;
        const toUser = await User.findById(toUserId);
        res.json({message:`${fromUser} ${status} ${toUser.firstName}.`,savedRequest}) 
     }catch(err){
        res.status(500).json({message:err.message})
     }
})


module.exports = requestrouter;