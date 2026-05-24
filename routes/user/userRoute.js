const { uploadFile } = require("../../controllers/fileController");
const authentication = require("../../middlewares/authentication");
const upload = require("../../middlewares/multer");
const DOCUMENT_MODEL = require("../../models/documentModel");
const asyncHandler = require("../../utils/asyncHandler");

const userRouter = require("express").Router();

userRouter.get("/", (req, res) => {
  res.send("User Dashboard");
});

userRouter.post(
  "/upload",
  authentication,

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

userRouter.get(
  "/documents",

  authentication,

  asyncHandler(async (req, res) => {
    /*
      User Documents
    */

    const documents = await DOCUMENT_MODEL.find({
      uploadedBy: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,

      documents,
    });
  }),
);

userRouter.post("/workspace", authentication, (req, res) => {
  res.send("Create Workspace");
});

module.exports = userRouter;
