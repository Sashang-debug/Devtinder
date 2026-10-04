const validator = require("validator");

const validateSignUpData = (req) =>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName||!lastName){
        throw new Error ("Inavlid name");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid emailId.");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please choose another strong password.");
    }
};

const validtaeUpadteProfileData = (req) =>{
       const allowedFields = ["firstName","lastName","emailId","about","gender","photourl","age","skills"];
       const isAllowed = Object.keys(req.body).every(field => allowedFields.includes(field));
       return isAllowed;
}

const validatePasswordUpdateData = (req) =>{
  try{
    const password = req.body.oldPassword;
    const logineduser = req.user;
    const validtaePassword = logineduser.validatePassword(password);
    return validtaePassword;
  } catch (err) {
    throw new Error("Error occurred while validating password.");
  }
}
module.exports = {validateSignUpData,validtaeUpadteProfileData,validatePasswordUpdateData};