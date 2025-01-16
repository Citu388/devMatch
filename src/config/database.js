const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://citusangwan356:gH7oQD0F1lCoi8AX@cluster0.j6qzf.mongodb.net/devMatch");
}

module.exports = connectDB;