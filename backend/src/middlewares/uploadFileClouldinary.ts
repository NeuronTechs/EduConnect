require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storageFile = new CloudinaryStorage({
  cloudinary,
  allowedFormats: [
    "jpg",
    "png",
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "csv",
    "zip",
    "rar",
    "tar",
    "gz",
    "bz2",
    "7z",
  ],
  params: {
    folder: "files",
    // resource_type: "raw",
  },
});
const uploadCloud = multer({ storage: storageFile });

module.exports = uploadCloud;
