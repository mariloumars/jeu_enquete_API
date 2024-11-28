var express = require("express");
var router = express.Router();
var db = require("../database.json");
var hal = require('../hal.js');
var {checkTokenMiddlewarePieces} = require('../jwt.js')

//Ressource protégé par login
router.get(
  "/pieces",
  checkTokenMiddlewarePieces,
  (req, res, next) => {
    res.status(200).json(hal.mapPiecesListToResourceObject(db.pieces));
  }
);

//Ressource protégé par login
router.get("/pieces/:id(\\d+)",
  checkTokenMiddlewarePieces, 
  (req, res, next) => {
  //récupérer l'id renseigné dans les params
  const id = req.params.id;
  const piece = db.pieces.find((piece) => piece.id == id);

  //Si la piece n'est pas trouvé
  if (piece === undefined) {
    res.status(404).json({});
    console.log("La piece que vous cherché n'est pas lié à l'enquête");
  }

  const mapPiecestoResourceObject = hal.mapPiecestoResourceObject(piece)

  res.status(200).json(mapPiecestoResourceObject);
});

module.exports = router;