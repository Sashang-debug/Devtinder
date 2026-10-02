const mongoose = require("mongoose");
const validator=require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minlength:3,
        maxlength:50,
        trim:true
    },
    lastName: {
        type: String,
        maxlength:50,
        trim:true
    },
    emailId: {
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid emailId."+ value);
            }
        }
    },
    password: {
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please choose another strong password.");
            }
        }
    },
    age: {
        type:Number,
        min:18
    },
    gender: {
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new error("Not valid gender.");
                
            }
        }
    },
    skills: {
       type:[String]
    },
    photourl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo Url.");
            }
        }
    },
    about:{
        type:String
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema);

module.exports = User;