const express = require("express");
const router = express.Router();
const Message = require("../models/ContactMsg");

router.post("/", async (req,res) => {
    try {
        const msg = new Message(req.body);
        await msg.save();
        res.status(200).json({
            success: true,
            message: "Successfully posted the message"
        });
    } catch (err) {
      res.status(500).json({ success: false, error: "Failed" });
    }
});

router.get("/", async (req,res) => {
    const data = await Message.find();
    res.json(data);
});

module.exports = router;