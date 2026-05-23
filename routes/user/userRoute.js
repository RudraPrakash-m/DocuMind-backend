const { uploadFile } = require("../../controllers/fileController");
const upload = require("../../middlewares/multer");

const userRouter = require("express").Router();

userRouter.get("/", (req, res) => {
  res.send("User Dashboard");
});

userRouter.post(
  "/upload",

  (req, res, next) => {
    upload.single("file")(req, res, (err) => {

      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      next();
    });
  },

  uploadFile,
);

module.exports = userRouter;
