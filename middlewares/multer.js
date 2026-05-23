const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary/cloudinary");

const path = require("path");

/*
 Allowed Extensions
*/

const allowedFormats = ["pdf", "md"];

/*
 Cloudinary Storage
*/

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const ext = path.extname(file.originalname).replace(".", "").toLowerCase();

    /*
      Validate Extension
    */

    if (!allowedFormats.includes(ext)) {
      throw new Error("Only PDF and MD files are allowed");
    }

    return {
      folder: "workspace_documents",

      resource_type: "raw",

      public_id: Date.now() + "-" + file.originalname.replace(/\s+/g, "-"),

      format: ext,
    };
  },
});

/*
 Multer Upload
*/

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
