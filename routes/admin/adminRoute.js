const adminRouter = require('express').Router();

adminRouter.get("/", (req, res) => {
  res.send("Admin Dashboard");
});

module.exports = adminRouter;