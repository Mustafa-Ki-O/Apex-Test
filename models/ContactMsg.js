const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    fullname:String,
    email: String,
    subject: String,
    message: String
 });

 module.exports = mongoose.model("Message", messageSchema);