const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Hi, you need access for response of data...</h1>");
});

module.exports = router;
