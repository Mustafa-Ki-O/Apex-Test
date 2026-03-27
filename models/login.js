const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    fullname:String,
    password: String
 },{ collection: 'login' });

 module.exports = mongoose.model("Login", loginSchema);