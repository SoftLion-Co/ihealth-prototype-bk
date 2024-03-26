require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");
const checkOrigin = require("./middlewares/request-origin");
const errorMiddleware = require("./middlewares/error-middleware");
const authMiddleware = require("./middlewares/auth-middleware");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(checkOrigin);
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
