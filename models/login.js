const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    fullname:String,
    password: String
 });

 module.exports = mongoose.model("Login", loginSchema);