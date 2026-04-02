const express = require("express");
const router = express.Router();
// const Message = require("../models/ContactMsg");
const Career = require("../models/ApplyMsg");
const verifyToken = require("../authMiddleware"); 
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const supabase = require("../supabaseClient");
const { randomUUID } = require("crypto");

// all

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg"
];

router.post("/", upload.single("cv"), async (req, res) => {
    try {
    const file = req.file;


    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type" });
    }



    // اسم الملف
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${randomUUID()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

        const { error } = await supabase.storage
      .from('careers')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype
      });

    if (error) throw error;


    const cr = new Career({
      fullname: req.body.fullname,
      email: req.body.email,
      subject: req.body.subject,
      cv: filePath 
    });

    await cr.save();

    res.status(200).json({
      success: true,
      message: "Successfully posted the career application"
    });

  } catch (err) {
    res.status(500).json({ success: false, error: "Failed" });
  }
});

// Admin ==> middleware
router.get("/", verifyToken, async (req, res) => {
    try {
        const data = await Career.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;