var express = require("express");
var router = express.Router();
var db = require("../database.json");
var hal = require('../hal.js')

router.get("/personnages", (req, res, next) => {
  res.status(200).json(hal.mapPersonnagesListToResourceObject(db.personnages));
});

router.get("/personnages/:id(\\d+)", (req, res, next) => {
  //récupérer l'id renseigné dans les params
  const id = req.params.id;
  const personnage = db.personnages.find((personnage) => personnage.id == id);

  //Si le personnages n'est pas trouvé
  if (personnage === undefined) {
    res.status(404).json({});
    console.log("Le personnage que vous cherché n'est pas lié à l'enquête");
  }

  const mapPersonnagestoResourceObject = hal.mapPersonnagestoResourceObject(personnage)

  res.status(200).json(mapPersonnagestoResourceObject);
});

module.exports = router;