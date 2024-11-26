var express = require("express");
var router = express.Router();
var db = require("../databaseUser.js");
var hal = require('../hal.js')
var bcrypt =require('bcrypt')
var jwt = require ('../jwt.js')


router.post("/login", (req, res, next) => {
 
 
  const login = req.body.nom;
  const password = req.body.password;
 
  if(authenticate(login, password)) {

    // Dégage si pas admin
    if(!isAutorized(login, password)){
      res.status(401).send("Go away");
      return;
    };

    //User est authentifié et admin: Génération d'un JSON Web Token
    const accessToken = jwt.createJWT(login, true, '1 day');

    //Si réussi, on va fournir un hypermédia JSON HAL (lien vers reservations pour un concert + access token)
    let responseObject = {
      "_links" : {
        "self": hal.halLinkObject('/login'),
        //Indiquer au client les URL /concerts/1/reservations, /concerts/2/reservations, etc.
        "Pieces" : hal.halLinkObject('/piece/{id}', 'string', '', true),
        "Inventaire" : hal.halLinkObject('/personnages/{id}/inventaire', 'string', '', true)
      },
      jwt: accessToken,
      message: `Bienvenue ${login} !`
    };
 
    res.status(200).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
 
  }else{
    let responseObject = {
      "_links" : {
        "self": hal.halLinkObject('/login'),
      },
      message: "Vos identifiants sont invalides. Merci de rééssayer."
    };
    //Sinon, on retourne un message d'erreur
    res.status(401).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
  }
 
 
});

function authenticate(login,password){

  const user = db.users.find(user => {
    //password en clair et password hashé en base
    return user.nom === login && bcrypt.compareSync(password,user.password);
  });

      if (user === undefined){

        return false
    }

    return true

}

function findUserByPseudo(nom){
  return db.users.find(user => user.nom === nom);
}

function isAutorized(nom){
  const user = findUserByPseudo(nom)
  return user && user.isAutorized;
}

module.exports = router;