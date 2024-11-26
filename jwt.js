const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs')
const SECRET = fs.readFileSync('private.key');
const EXPIRATION = "1 day"
 
//Déclarer un middleware qui vérifiera le jwt retourné par le client

const checkTokenMiddleware = (req, res, next) => {

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

        //La vérification a réussi !
        console.log('TOKEN VERIFIE !')

        res.locals.decodedToken = decodedToken
        next();
    })
    
}


const extractBearerToken = headervalue => {

    if(typeof headervalue !== 'string'){
        return false;
    }
    const matches = headervalue.match(/(bearer)\s+(\S+)/i);
    return matches && matches[2];
}

//Utiliser ce middleware sur toutes les routes protégées.
 
/**
* Retourne un jwt signé avec une date d'expiration
* @param {*} login
* @param {*} isAutorized
* @returns
*/
function createJWT(login, isAutorized, expiration = EXPIRATION) {
  return jsonwebtoken.sign(
    {
      login: login,
      isAutorized: isAutorized,
    },
    SECRET, {
        expiresIn: expiration
    }
  );
}
 
module.exports = {createJWT, checkTokenMiddleware, extractBearerToken}