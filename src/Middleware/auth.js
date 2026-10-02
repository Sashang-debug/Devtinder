const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const userauth = async (req,res,next)=>{
    try{
        const cookie = req.cookies;
        const token = cookie.token;
        if(!token){
            return res.status(401).send("Please login first.");
        }
        const decodedMessage= await jwt.verify(token,"DEV@Tinder790");

        const id = decodedMessage.id;

        const user = await User.findById(id);
        if(!user){
          return res.status(404).send("Please login first.");
        }
        req.user = user;
        next();
  }catch(err){
    return res.status(500).send("Something went wrong!");
  }
}

module.exports = userauth;