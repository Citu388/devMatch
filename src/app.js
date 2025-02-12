const express = require("express");
const app = express();
const connectToDB = require("./config/database");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);

connectToDB().then(()=>{
   console.log("Database connection is established");
   app.listen(7777, ()=>{
      console.log("Server is running on port 7777");
   })
}).catch((err) =>{
   console.log("DB connection not established");
})
