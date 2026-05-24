require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const publicRouter = require("./routes/public/publicRoute");
const adminRouter = require("./routes/admin/adminRoute");
const userRouter = require("./routes/user/userRoute");
const connectDB = require("./config/db/db");
const { clerkMiddleware } = require("@clerk/express");

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use(clerkMiddleware());

const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

app.use("/public", publicRouter);

app.use("/admin", adminRouter);

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
