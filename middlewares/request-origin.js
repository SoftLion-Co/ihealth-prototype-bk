module.exports = function (req, res, next) {
  console.log(req.headers.referer);
  /*   if (
    req.headers.referer &&
    (req.headers.referer.startsWith("http://localhost:3000") ||
      "https://accounts.google.com/")
  ) { */
  next();
  /*   } else {
    res.status(403).send("Forbidden");
  } */
};
