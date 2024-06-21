require("express-async-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");
const checkOrigin = require("./middlewares/request-origin");
const errorMiddleware = require("./middlewares/errorMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const dbContext = require("./generic/database/dbContext");
const config = require("./config/config");
const customerService = require("./services/customerService");

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
app.use("/", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    dbContext.connect();
    app.listen(config.server.port, () => {
      console.log(`Server is running on port ${config.server.port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
