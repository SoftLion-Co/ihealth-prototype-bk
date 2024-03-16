require("express-async-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");
const errorMiddleware = require("./middlewares/error-middleware");
const dbContext = require("./generic/database/dbContext");
const config = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
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
