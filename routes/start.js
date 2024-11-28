var express = require("express");
var router = express.Router();
var db = require("../database.json");

router.get("/", (req, res, next) => {
  res.status(200).json(db.start);
});

module.exports = router;