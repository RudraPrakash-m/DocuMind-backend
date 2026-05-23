const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    },
  );
};

// Send Cookie
const sendTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,

    secure: false,

    sameSite: "lax",

    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

module.exports = {
  generateToken,
  sendTokenCookie,
};
