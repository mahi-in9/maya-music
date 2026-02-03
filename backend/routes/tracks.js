const express = require("express");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const router = express.Router();
const upload = multer({ storage });

// This route handles the upload and saves the URL to your DB
router.post("/upload", upload.single("audio"), async (req, res) => {
  try {
    // req.file.path is the URL provided by Cloudinary
    const audioUrl = req.file.path;
    const publicId = req.file.filename;

    // Save audioUrl and publicId to your PostgreSQL/MongoDB here
    // const newTrack = await Track.create({ title: req.body.title, url: audioUrl });

    res.status(200).json({ success: true, url: audioUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
