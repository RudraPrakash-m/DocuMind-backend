const { uploadFile } = require("../../controllers/fileController");
const authentication = require("../../middlewares/authentication");
const upload = require("../../middlewares/multer");
const DOCUMENT_MODEL = require("../../models/documentModel");
const WORKSPACE_MODEL = require("../../models/workspaceModel");
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
      uploadedBy: req.user.id,
    }).sort({
      createdAt: -1,
    });
    

    res.status(200).json({
      success: true,

      documents,
    });
  }),
);

userRouter.post("/workspace/create", authentication, async (req, res) => {
  try {
    const { name, description } = req.body;

    /*
      Validation
    */
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Workspace name is required",
      });
    }

    /*
      Create Workspace
    */
    const workspace = await WORKSPACE_MODEL.create({
      name: name.trim(),

      description: description?.trim() || "",

      owner: req.user.id,

      groups: [],
    });

    return res.status(201).json({
      success: true,

      message: "Workspace created successfully",

      workspace,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Failed to create workspace",
    });
  }
});

userRouter.get("/workspaces/all", authentication, async (req, res) => {
  try {
    const workspaces = await WORKSPACE_MODEL.find({
      $or: [
        {
          owner: req.user.id,
        },

        {
          "groups.members.user": req.user.id,
        },
      ],
    }).populate("groups.members.user", "name email");

    return res.status(200).json({
      success: true,

      workspaces,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch workspaces",
    });
  }
});

module.exports = userRouter;
