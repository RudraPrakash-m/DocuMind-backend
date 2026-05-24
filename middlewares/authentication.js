const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.cookies.token;

    // console.log(" TOKEN:", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    // console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = authentication;
