const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    fullname:String,
    email: String,
    subject: String,
    cv: String
 });

 module.exports = mongoose.model("Career", messageSchema);