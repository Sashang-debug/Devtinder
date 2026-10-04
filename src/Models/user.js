const mongoose = require("mongoose");
const validator=require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            if (value && !["male","female","others"].includes(value)) {
                throw new Error("Not valid gender.");
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

userSchema.methods.getJWT=async function(){//These are schema methods which can be called on the instance of the model.
    const user = this;
    const token = await jwt.sign({id:user._id},"DEV@Tinder790",{expiresIn:"7d"});
    return token;
}

userSchema.methods.validatePassword=async function(password){//avoid using arrow function here.
    const user = this;
    const ispasswordMatch = await bcrypt.compare(password,user.password);//Dont interchage the order of parameters.
    return ispasswordMatch;
}

const User = mongoose.model("User",userSchema);

module.exports = User;