const DOCUMENT_MODEL = require("../models/documentModel");
const asyncHandler = require("../utils/asyncHandler");

const uploadFile = asyncHandler(async (req, res) => {
  /*
    Check File
  */

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  /*
    Save Into MongoDB
  */

  const newDocument = await DOCUMENT_MODEL.create({
    title: req.body.title,

    fileUrl: req.file.path,

    publicId: req.file.filename,

    fileType: req.file.format,

    fileSize: req.file.size,

    workspaceId: req.body.workspaceId,

    uploadedBy: req.user?._id,

    status: "completed",
  });

  /*
    Final Response
  */

  res.status(201).json({
    success: true,

    message: "File uploaded successfully",

    document: newDocument,
  });
});

module.exports = {
  uploadFile,
};
