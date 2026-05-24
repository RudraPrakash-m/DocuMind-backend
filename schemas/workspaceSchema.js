const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "user",
  },

  role: {
    type: String,

    default: "member",
  },
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  color: {
    type: String,
    default: "bg-blue-400",
  },

  members: [memberSchema],
});

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "user",

      required: true,
    },

    groups: [groupSchema],
  },

  {
    timestamps: true,
  },
);

module.exports = workspaceSchema;
