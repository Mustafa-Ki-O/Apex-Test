require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 

const app = express();

app.use(cors()); 
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected 🔥"))
  .catch(err => console.log(err));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String
});

const Message = mongoose.model("Message", messageSchema);

app.post("/messages", async (req, res) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: "Error saving data" });
  }
});

app.get("/messages", async (req, res) => {
  const data = await Message.find();
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));