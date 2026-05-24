const express = require("express");

const { getAuth, clerkClient } = require("@clerk/express");

const USER_MODEL = require("../../models/userModel");

const { generateToken, sendTokenCookie } = require("../../utils/jwt.utils");

const publicRouter = express.Router();

/*
  REGISTER / LOGIN WITH CLERK
*/

publicRouter.post("/register", async (req, res) => {
  try {
    /*
      GET VERIFIED AUTH
    */

    const auth = getAuth(req);

    // console.log("AUTH:", auth);

    /*
      CHECK AUTHORIZATION
    */

    if (!auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    /*
      VERIFIED CLERK USER ID
    */

    const clerkId = auth.userId;

    // console.log("CLERK ID:", clerkId);

    /*
      FETCH REAL USER DATA FROM CLERK
    */

    const userData = await clerkClient.users.getUser(clerkId);

    /*
      EXTRACT USER DETAILS
    */

    const email = userData.emailAddresses[0]?.emailAddress;

    const firstName = userData.firstName || "";

    const lastName = userData.lastName || "";

    const name = `${firstName} ${lastName}`.trim();

    /*
      FIND EXISTING USER
    */

    let user = await USER_MODEL.findOne({
      clerkId,
    });

    /*
      EXISTING USER → LOGIN
    */

    if (user) {
      const token = generateToken(user);

      sendTokenCookie(res, token);

      return res.status(200).json({
        success: true,

        message: "Login successful",

        user,
      });
    }

    /*
      CREATE NEW USER
    */

    user = await USER_MODEL.create({
      clerkId,
      name,
      email,
    });

    /*
      GENERATE JWT
    */

    const token = generateToken(user);

    /*
      SEND JWT COOKIE
    */

    sendTokenCookie(res, token);

    /*
      RESPONSE
    */

    res.status(201).json({
      success: true,

      message: "User registered successfully",

      user,
    });
  } catch (error) {
    console.error("Auth Error:", error);

    res.status(500).json({
      success: false,

      message: "Authentication failed",

      error: error.message,
    });
  }
});

/*
  LOGOUT
*/

publicRouter.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "lax",
    });

    res.status(200).json({
      success: true,

      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Logout failed",
    });
  }
});

module.exports = publicRouter;
