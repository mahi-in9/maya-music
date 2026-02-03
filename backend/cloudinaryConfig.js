const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "drowsy_music_tracks",
    resource_type: "video", // Cloudinary treats audio as 'video' type
    allowed_formats: ["mp3", "wav", "aac"],
  },
});

module.exports = { cloudinary, storage };
