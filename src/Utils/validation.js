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

module.exports = {validateSignUpData};