var express = require("express");
var router = express.Router();
var db = require("../database.json");
var hal = require('../hal.js')
var {checkTokenMiddlewareObjets} = require('../jwt.js')

router.get("/objets", 
  checkTokenMiddlewareObjets,
  (req, res, next) => {
  res.status(200).json(hal.mapObjetsListToResourceObject(db.objets));
});

router.get("/objets/:id(\\d+)",
  checkTokenMiddlewareObjets,
  (req, res, next) => {
  //récupérer l'id renseigné dans les params
  const id = req.params.id;
  const objet = db.objets.find((objet) => objet.id == id);

  //Si l'objet n'est pas trouvé
  if (objet === undefined) {
    res.status(404).json({});
    console.log("L'objet que vous cherché n'est pas lié à l'enquête");
  }

  const mapObjetstoResourceObject = hal.mapObjetstoResourceObject(objet)

  res.status(200).json(mapObjetstoResourceObject);
});

module.exports = router;