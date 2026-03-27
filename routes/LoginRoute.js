const express = require("express");
const router = express.Router();
const Login = require("../models/login");

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

      
        if (user.password !== password) {
            return res.status(401).json({ 
                success: true, 
                isAuth: false,
                message: "كلمة المرور خطأ" 
            });
        }

      
        res.status(200).json({
            success: true,
            isAuth: true,
            message: "تم التحقق بنجاح ... مرحبا"
        });

    } catch (err) {
        res.status(500).json({ success: false, error: "خطأ في السيرفر" });
    }
});

module.exports = router;