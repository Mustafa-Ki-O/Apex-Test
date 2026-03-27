const express = require("express");
const router = express.Router();
const Message = require("../models/ContactMsg");
const verifyToken = require("../authMiddleware"); 

// all
router.post("/", async (req, res) => {
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

// Admin ==> middleware
router.get("/", verifyToken, async (req, res) => {
    try {
        const data = await Message.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ success: false, error: "حدث خطأ أثناء جلب البيانات" });
    }
});

module.exports = router;