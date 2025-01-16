const validator = require("validator");

const validateSignUpData = (req)=>{
     const { firstName, lastName, emailId,password } = req.body;
     if(!firstName){
          throw new Error("Please enter your first name");
     }
     else if(!validator.isEmail(emailId)){
          throw new Error("Please enter valid email Id");
     }
//      else if(!validator.isStrongPassword(password)){
//           throw new Error("Please enter strong password");
//      }
}

module.exports = { validateSignUpData };