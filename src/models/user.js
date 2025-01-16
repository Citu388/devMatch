const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
     firstName : {
          type : String,
          required : true
     },
     lastName : {
          type : String,
     },
     emailId : {
          type : String,
          required : true,
          trim : true,
          unique : true,
          lowercase : true,
          validate(value){
             if(!validator.isEmail(value)){
                 throw new Error("Invalid email Id :" + value);
             }
          }
     },
     password : {
          type : String,
          required : true
       },
       age : {
          type : Number,
          min : 18 
       },
       gender : {
          type : String,
   
          validate(value){
             if(!["male","female","others"].includes(value)){
                throw new Error("gender is not valid");
             }
          }
       },
       photoUrl : {
          type : String,
      
       },
       about : {
          type : String
       },
       skills : {
          type : [String]   //array of strings
       }
},{
    timestamps : true
})


//create user model
const User = mongoose.model("User",userSchema);

module.exports = User;