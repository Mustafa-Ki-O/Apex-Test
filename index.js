const PORT = process.env.PORT || 3000;

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected 🔥"))
  .catch(err => console.log(err));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String
});

const Message = mongoose.model("Message", messageSchema);

// POST
app.post("/messages", async (req, res) => {
  const msg = new Message(req.body);
  await msg.save();
  res.json(msg);
});

// GET
app.get("/messages", async (req, res) => {
  const data = await Message.find();
  res.json(data);
});

app.listen(PORT, () => console.log("Server running"));

