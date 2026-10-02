const express = require("express");

const {connectdb} = require("./Config/database");

const User = require("./Models/user");

const app = express();

app.use(express.json());

app.post("/signup",async (req,res)=>{
    const user = new User(req.body);
    try{
       await user.save();
       res.send("Inserted Succesfully.")
    }catch(err){
        res.send("Something went wrong!")
    }
})

app.get("/feed",async(req,res)=>{
  try{
     const user =  await User.find({});
     res.send(user);
  }catch(err){
    res.status(404).send("User not found.");
  }
})

app.get("/user",async(req,res)=>{
    const userMail = req.body.emailId;
    try{
        const user = await User.findOne({emailId:userMail});
        res.status.send(user);
    }catch(err){
        res.status(404).send("cannot find user.")
    }
})

app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.status(200).send("Deleted Sussefully.");
    }catch(err){
        res.send(err);
    }
})

app.patch("/user/:userId",async(req,res)=>{
   const userId = req.params.userId;
   const data =req.body;
   try{
     const ALLOWED_UPDATES = ["photourl","about","gender","age","skills"];
     const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
     if(!isUpdateAllowed){
        throw new Error("Updte is not allowed.");
     }
     
     const user =await User.findByIdAndUpdate(userId,data,{runValidators:true});
     res.status(200).send("Sucess");
   }catch(err){
    res.send(err);
   }
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

