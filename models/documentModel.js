const mongoose = require("mongoose");
const documentSchema = require("../schemas/documentSchema");

const DOCUMENT_MODEL = mongoose.model("document", documentSchema);

module.exports = DOCUMENT_MODEL;