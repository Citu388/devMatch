const express = require("express");

const app = express();

app.get("/hello", (req,res) => {
   res.send("Hello there");
})

app.listen(7777);