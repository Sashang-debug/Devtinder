const express = require('express');
const userrouter=express.Router();
const userauth = require("../Middleware/auth");
const connectionRequestModel = require("../Models/connectionRequest");

userrouter.get("/user/requests/received",userauth,async(req,res)=>{
    try{
       const loggedInUser = req.user;
       const requests = await connectionRequestModel.find({
              toUserId:loggedInUser.id,
              status:"interested",
       }).populate("fromUserId","firstName lastName photoUrl age gender skills about");
       res.json({requests})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

userrouter.get("/user/connections",userauth,async(req,res)=>{
    try{
       const loggedInUser = req.user;
       const connections = await connectionRequestModel.find({
              $or:[
                {fromUserId:loggedInUser.id,status:"accepted"},
                {toUserId:loggedInUser.id,status:"accepted"}
              ]
       }).populate("fromUserId","firstName lastName photoUrl age gender skills about").populate("toUserId","firstName lastName photoUrl age gender skills about");
       const data = connections.map((row)=>{
        if(row.fromUserId._id.toString() === loggedInUser.id){
            return row.toUserId;
        }else{
            return row.fromUserId;
        } 
       })
       res.json({connections:data});
    }catch(err){
      res.status(500).json({message:err.message})
    }
})

userrouter.get("/feed",userauth,async(req,res)=>{
      try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
        const connections = await connectionRequestModel.find({
                $or:[
                    {fromUserId:loggedInUser.id},
                    {toUserId:loggedInUser.id}
                ]
        }).select("fromUserId toUserId");
        const hiddenUser = new Set();
        connections.forEach((req)=>{
            hiddenUser.add(req.fromUserId.toString());
            hiddenUser.add(req.toUserId.toString());
        })

        const users = await User.find({
            $and:[
                {_id:{$ne:loggedInUser.id}},
                {_id:{$nin:Array.from(hiddenUser)}}, 
            ]
        }).select("firstName lastName photoUrl age gender skills about").skip(skip).limit(limit);
        res.json({data : users});
      }catch(err){
        res.status(500).json({message:err.message})
      }
})

module.exports = userrouter;