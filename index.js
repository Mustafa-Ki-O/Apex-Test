require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const messageRoutes = require("./routes/ContactRoute")
const loginRoutes = require("./routes/LoginRoute")
const careerRoutes = require("./routes/ApplyRoute")

const helmet = require("helmet");
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(helmet());

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);



mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected 🔥"))
  .catch(err => console.log(err));


app.use("/api/messages", messageRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/career",careerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));