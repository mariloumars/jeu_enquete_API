var express = require("express");
var router = express.Router();
var db = require("../databaseUser.js");
var hal = require('../hal.js')
var bcrypt =require('bcrypt')
var jwt = require ('../jwt.js')


router.post("/login", (req, res, next) => {
 
 
  const login = req.body.pseudo;
  const password = req.body.password;
 
  if(authenticate(login, password)) {

    // Dégage si pas admin
    if(!isAutorized(login, password) && !isDetective(login, password)&& !isSoluce(login, password)){
      res.status(401).send("Go away");
      return;
    };
    if(isAutorized(login, password)){
      const accessToken = jwt.createJWT(login, true, false, false,'1 day');

      let responseObject = {
      "_links" : {
        "self": hal.halLinkObject('/login'),
        "Pieces" : hal.halLinkObject('/pieces', 'string', '', true),
        "Piece" : hal.halLinkObject('/pieces/{id}', 'string', '', true),
      },
      jwt: accessToken,
      message: `Bienvenue ${login} !`
    };
      res.status(200).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
    }
    if(isDetective(login, password)){
      const accessToken = jwt.createJWT(login, false, true , false,'1 day');
      
      let responseObject = {
      "_links" : {
        "self": hal.halLinkObject('/login'),
        //Indiquer au client les URL /concerts/1/reservations, /concerts/2/reservations, etc.
        "Objets" : hal.halLinkObject('/objets', 'string', '', true),
        "Objet" : hal.halLinkObject('/objets/{id}', 'string', '', true),
      },
      jwt: accessToken,
      message: `Bienvenue ${login} !`
    };
      res.status(200).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
  }
  if(isAutorized(login, password) && isDetective(login, password)&& isSoluce(login, password)){
      const accessToken = jwt.createJWT(login, true, true , true,'1 day');
      
      let responseObject = {
      "_links" : {
        "self": hal.halLinkObject('/login'),
        //Indiquer au client les URL /concerts/1/reservations, /concerts/2/reservations, etc.
        "Objets" : hal.halLinkObject('/solution', 'string', '', true),
      },
      jwt: accessToken,
      message: `Bienvenue ${login} !`
    };
      res.status(200).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
  }
 
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
    return user.pseudo === login && bcrypt.compareSync(password,user.password);
  });

      if (user === undefined){

        return false
    }

    return true

}

function findUserByPseudo(pseudo){
  return db.users.find(user => user.pseudo === pseudo);
}

function isAutorized(pseudo){
  const user = findUserByPseudo(pseudo)
  return user && user.isAutorized;
}

function isDetective(pseudo){
  const user = findUserByPseudo(pseudo)
  return user && user.isDetective;
}

module.exports = router;