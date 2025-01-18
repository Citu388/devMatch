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
});

authRouter.post("/login", async (req,res) => {

     try{
          const { emailId, password } = req.body;
          const user = await User.findOne({ emailId : emailId});

          if(!user){
               throw new Error("Email Id does not exist");
          }

          const isPasswordValid = await user.validatePassword(password);
          if(!isPasswordValid){
               throw new Error("Password is incorrect");
          }else{
               const token = await user.getJWT();
               res.cookie("token", token);
               res.send("login successfull");
          }
     }catch(err){
          res.status(400).send("ERROR : " + err.message);
     }
     
})

authRouter.post("/logout", async(req,res) =>{
     res.cookie("token",null,{expires : new Date(Date.now())});
     res.send("Logged Out");
})

module.exports = authRouter;

