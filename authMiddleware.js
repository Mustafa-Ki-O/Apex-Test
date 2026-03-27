const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // جلب التوكن من الهيدر (Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "غير مسموح بالدخول" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // تخزين بيانات المستخدم المشفرة في الطلب
        next(); // السماح بالانتقال للخطوة التالية (الـ Route)
    } catch (err) {
        return res.status(403).json({ message: "التوكن غير صالح أو منتهي الصلاحية" });
    }
};

module.exports = verifyToken;