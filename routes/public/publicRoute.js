const express = require("express");

const USER_MODEL = require("../../models/userModel");

const { generateToken, sendTokenCookie } = require("../../utils/jwt.utils");

const publicRouter = express.Router();

publicRouter.post("/register", async (req, res) => {
  try {
    const data = req.body;

    // Find Existing User
    let user = await USER_MODEL.findOne({
      email: data.email,
    });

    // Existing User → Login
    if (user) {
      const token = generateToken(user);

      sendTokenCookie(res, token);

      return res.status(200).json({
        message: "Login successful",

        user,
      });
    }

    // Create User
    user = await USER_MODEL.create(data);

    // Generate Token
    const token = generateToken(user);

    // Send Cookie
    sendTokenCookie(res, token);

    // Response
    res.status(201).json({
      message: "User registered successfully",

      user,
    });
  } catch (error) {
    console.error("Auth Error:", error);

    res.status(500).json({
      message: "Authentication failed",

      error: error.message,
    });
  }
});

publicRouter.post("/logout", (req, res) => {
  // console.log("logout triggered");

  res.clearCookie("token");
  res.status(200).json({
    message: "Logout successful",
  });
});

module.exports = publicRouter;
