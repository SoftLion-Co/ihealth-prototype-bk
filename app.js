const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const routes = require("./routes/routes");

app.use(cors());
app.use("/", routes);

const PORT = process.env.PORT || 3001;

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
