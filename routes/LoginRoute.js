const express = require("express");
const router = express.Router();
const Login = require("../models/login");

router.post("/", async (req,res) => {
    try {
        const msg = new Login(req.body);
        await msg.save();
        res.status(200).json({
            success: true,
            message: "Successfully posted the message"
        });
    } catch (err) {
      res.status(500).json({ success: false, error: "Failed" });
    }
});

module.exports = router;