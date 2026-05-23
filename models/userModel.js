const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");

const USER_MODEL = mongoose.model("user", userSchema);

module.exports = USER_MODEL;