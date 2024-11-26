var express = require("express");
var router = express.Router();
// var db = require("../database.json");
// var hal = require('../hal.js');
var {checkTokenMiddleware} = require('../jwt.js')

//Ressource protégé par login
// Le middleware est appelé, puis celui qui est déclaré si "next"
router.get("/personnages/:id(\\d)+/inventaire",(req, res, next) => {
  
  const id = req.params.id;
  const personnage = db.personnages.find((personnage) => personnage.id == id);

  //Si le concert n'est pas trouvé
  if (personnage === undefined) {
    res.status(404).json({});
    console.log("Le personnage que vous cherché n'est pas lié à l'enquête");
  }

  const mapPersonnagestoResourceObject = hal.mapPersonnagestoResourceObject(personnage)

  res.status(200).json(mapPersonnagestoResourceObject);
  }
);

module.exports = router;