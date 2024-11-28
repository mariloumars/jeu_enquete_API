var express = require("express");
var router = express.Router();
var db = require("../database.json");

router.get("/solution", (req, res, next) => {
  res.status(200).json(db.solution);
});

module.exports = router;