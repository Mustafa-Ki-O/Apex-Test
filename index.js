require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const messageRoutes = require("./routes/ContactRoute")


const app = express();
app.use(cors()); 
app.use(express.json());



mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected 🔥"))
  .catch(err => console.log(err));


app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));