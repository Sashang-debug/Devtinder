const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
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