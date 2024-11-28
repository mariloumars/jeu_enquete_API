const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs')
const SECRET = fs.readFileSync('private.key');
const EXPIRATION = "1 day"


const checkTokenMiddlewareObjets = (req, res, next) => {

    //Le JWT est placé dans le header Authorization
    //Recupere le jwt envoyé par le client
    const token  = req.headers.authorization && extractBearerToken(req.headers.authorization);
    //Si pas de jwt
    if(!token){
        return res.status(401).json({"msg" : "Vous n'êtes pas autorisé-e à accéder à cette ressource."})
    }

    //Vérification du jwt
    jsonwebtoken.verify(token, SECRET, (err, decodedToken) => {

        //La vérification a échoué
        if(err){
            res.status(401).json({"msg" : "Vous n'êtes pas autorisé-e à accéder à cette ressource."})
        }

        if(jsonwebtoken.isDetective === true){
        //La vérification a réussi !
        console.log('TOKEN VERIFIE !')

        res.locals.decodedToken = decodedToken
        next();
        }else{
          res.status(401).json({"msg" : "Vous n'êtes pas autorisé-e à accéder à cette ressource."})
        }
    })
    
}

const checkTokenMiddlewarePieces = (req, res, next) => {

    //Le JWT est placé dans le header Authorization
    //Recupere le jwt envoyé par le client
    const token  = req.headers.authorization && extractBearerToken(req.headers.authorization);
    //Si pas de jwt
    if(!token){
        return res.status(401).json({"msg" : "Vous n'êtes pas autorisé-e à accéder à cette ressource."})
    }

    //Vérification du jwt
    jsonwebtoken.verify(token, SECRET, (err, decodedToken) => {

        //La vérification a échoué
        if(err){
            res.status(401).json({"msg" : "Vous n'êtes pas autorisé-e à accéder à cette ressource."})
        }

        if(jsonwebtoken.isAutorized === true){
        //La vérification a réussi !
        console.log('TOKEN VERIFIE !')

        res.locals.decodedToken = decodedToken
        next();
        }else{
          res.status(401).json({"msg" : "Vous n'êtes pas autorisé-e à accéder à cette ressource."})
        }
    })
    
}

const checkTokenMiddlewareSoluce = (req, res, next) => {

    //Le JWT est placé dans le header Authorization
    //Recupere le jwt envoyé par le client
    const token  = req.headers.authorization && extractBearerToken(req.headers.authorization);
    //Si pas de jwt
    if(!token){
        return res.status(401).json({"msg" : "Vous n'êtes pas autorisé-e à accéder à cette ressource."})
    }

    //Vérification du jwt
    jsonwebtoken.verify(token, SECRET, (err, decodedToken) => {

        //La vérification a échoué
        if(err){
            res.status(401).json({"msg" : "Vous n'êtes pas autorisé-e à accéder à cette ressource."})
        }

        if(jsonwebtoken.isSoluce === true){
        //La vérification a réussi !
        console.log('TOKEN VERIFIE !')

        res.locals.decodedToken = decodedToken
        next();
        }else{
          res.status(401).json({"msg" : "Vous n'êtes pas autorisé-e à accéder à cette ressource."})
        }
    })
    
}


const extractBearerToken = headervalue => {

    if(typeof headervalue !== 'string'){
        return false;
    }
    const matches = headervalue.match(/(bearer)\s+(\S+)/i);
    return matches && matches[2];
}


 
/**
* Retourne un jwt signé avec une date d'expiration
* @param {*} login
* @param {*} isAutorized
* @param {*} isDetective
* @param {*} isSoluce
* @returns
*/
function createJWT(login, isAutorized, isDetective, isSoluce, expiration = EXPIRATION) {
  return jsonwebtoken.sign(
    {
      login: login,
      isAutorized: isAutorized,
      isDetective: isDetective,
      isSoluce : isSoluce
    },
    SECRET, {
        expiresIn: expiration
    }
  );
}

 
module.exports = {createJWT, checkTokenMiddlewareObjets, checkTokenMiddlewarePieces, extractBearerToken, checkTokenMiddlewareSoluce}