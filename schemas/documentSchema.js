const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
    },

    fileSize: {
      type: Number,
    },

    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Workspace",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "user",
    },

    extractedText: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },

    status: {
      type: String,

      enum: ["uploading", "processing", "completed", "failed"],

      default: "uploading",
    },
  },

  {
    timestamps: true,
  },
);

module.exports = documentSchema;
