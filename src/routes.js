const express = require("express");

const routes = express.Router();

routes.get("/", (req, res, next) => {
  res.status(200).json({ message: "We are on!" });

  next();
});

module.exports = routes;
