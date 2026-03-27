const express = require("express");
const router = express.Router();
const Login = require("../models/login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 

router.post("/", async (req, res) => {
    try {
        const { fullname, password } = req.body;

        const user = await Login.findOne({ fullname: fullname });

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "بيانات الدخول غير صحيحة" 
            });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                isAuth: false,
                message: "كلمة المرور خطأ" 
            });
        }

 
        const token = jwt.sign(
          { id: user._id, role: "admin" }, 
          process.env.JWT_SECRET, 
          { expiresIn: "30d" } 
        );

        res.status(200).json({
            success: true,
            token: token,
            message: "تم التحقق بنجاح ... مرحبا"
        });

    } catch (err) {
        res.status(500).json({ success: false, error: "خطأ في السيرفر" });
    }
});

module.exports = router;