const mongoose = require("mongoose");
const User = require("./user");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",//refrence to the user model
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",//refrence to the user model
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["ignore","accepted","rejected","interested"],
            message:"Status must be either ignore, accepted, or rejected"
        },
    }
},{timestamps:true})

const connectionRequestModel = mongoose.model("connectionRequest",connectionRequestSchema);
module.exports = connectionRequestModel;