const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user")

authRouter.post("/signup", async (req,res)=>{
     try{
          const {firstName,lastName,password,emailId} = req.body;

          validateSignUpData(req);
 
          const passwordHash = await bcrypt.hash(password,10);

          const user = new User({
              firstName, lastName,password : passwordHash, emailId
          })
          await user.save();
          res.send("User added successfully");

     }catch(err){
          res.status(400).send("Error saving the user :" + err.message);
     }
})

module.exports = authRouter;

