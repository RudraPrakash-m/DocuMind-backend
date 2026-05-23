const mongoose = require("mongoose");
const workspaceSchema = require("../schemas/workspaceSchema");

const WORKSPACE_MODEL = mongoose.model("Workspace", workspaceSchema);

module.exports = WORKSPACE_MODEL;