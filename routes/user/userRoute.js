const { uploadFile } = require("../../controllers/fileController");
const upload = require("../../middlewares/multer");

const userRouter = require("express").Router();

userRouter.get("/", (req, res) => {
  res.send("User Dashboard");
});

userRouter.post("/upload", upload.single("file"), uploadFile);

module.exports = userRouter;
