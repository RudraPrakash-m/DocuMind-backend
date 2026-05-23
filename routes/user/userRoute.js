const userRouter = require('express').Router();

userRouter.get("/", (req, res) => {
  res.send("User Dashboard");
});

module.exports = userRouter;