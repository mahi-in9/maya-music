import express, { json } from "express";
import { connect, model, Schema } from "mongoose";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(json());

// 1. MongoDB Connection
connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// 2. Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 3. Dynamic Multer + Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Extract title from body; fallback if missing
    const rawTitle = req.body.title || "untitled_track";
    // Clean name: "Sleep Rain" -> "sleep_rain"
    const cleanName = rawTitle.toLowerCase().replace(/\s+/g, "_");

    return {
      folder: "drowsy_music",
      resource_type: "video",
      public_id: `${cleanName}_${Date.now()}`, // Unique name based on title
      allowed_formats: ["mp3", "wav"],
    };
  },
});

const upload = multer({ storage });

// 4. Mongoose Model
const Track = model(
  "Track",
  new Schema({
    title: String,
    audioUrl: String,
    createdAt: { type: Date, default: Date.now },
  }),
);

// 5. The Upload Route
app.post("/api/tracks/upload", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded.");

    const newTrack = new Track({
      title: req.body.title,
      audioUrl: req.file.path,
    });

    await newTrack.save();
    res.status(200).json({ success: true, url: newTrack.audioUrl });
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/tracks", async (req, res) => {
  const tracks = await Track.find().sort({ createdAt: -1 });
  res.json(tracks);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
