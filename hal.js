/**
 * Export des fonctions helpers pour la spécification HAL
 * Voir la spécification HAL : https://stateless.group/hal_specification.html
 * Voir la spécification HAL (RFC, source) : https://datatracker.ietf.org/doc/html/draft-kelly-json-hal
 */

const { personnages } = require("./database.json");
const { pieces } = require("./database.json");

/**
 * Retourne un Link Object, conforme à la spécification HAL
 * @param {*} url 
 * @param {*} type 
 * @param {*} name 
 * @param {*} templated 
 * @param {*} deprecation 
 * @returns 
 */
function halLinkObject(url, type = '', name = '', templated = false, deprecation = false) {

    return {
        "href": url,
        "templated": templated,
        ...(type && { "type": type }),
        ...(name && { "name": name }),
        ...(deprecation && { "deprecation": deprecation })
    }
}

function mapPersonnagesListToResourceObject(personnagesData){

  const embedded = personnages.map( personnages => mapPersonnagestoResourceObject(personnages))

  return{
    "_links":{
        "self": halLinkObject(`/personnages`),

    },
    "_embedded":{
      "personnages": embedded,
    }
  }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un personnage
 * @param {*} personnagesData Données brutes d'un personnage
 * @returns un Ressource Object Personnage (spec HAL)
 */
function mapPersonnagestoResourceObject(personnagesData, baseURL) {
    return {
        "_links": {
            "self": halLinkObject(`/personnages/${personnagesData.id}`),
            "personnages": halLinkObject(`/personnages`),
            "inventaire": halLinkObject(`/personnages/${personnagesData.id}/inventaire`)
        },

        //Données d'un personnages à ajouter ici...
        id: personnagesData.id,
        nom: personnagesData.nom,
        age: personnagesData.age,
        race:personnages.race,
        description : personnagesData.description,
        occupation : personnagesData.occupation,
        motif_possible : personnagesData.motif_possible,
        alibi : personnagesData.alibi,
        remarque : personnagesData.remarque,
    }
}

function mapPiecesListToResourceObject(piecesData){

  const embedded = pieces.map( pieces => mapPiecestoResourceObject(pieces))

  return{
    "_links":{
        "self": halLinkObject(`/pieces`),

    },
    "_embedded":{
      "pieces": embedded,
    }
  }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un personnage
 * @param {*} personnagesData Données brutes d'un personnage
 * @returns un Ressource Object Personnage (spec HAL)
 */
function mapPiecestoResourceObject(piecesData, baseURL) {
    return {
        "_links": {
            "self": halLinkObject(`/pieces/${piecesData.id}`),
            "pieces": halLinkObject(`/pieces`)
        },

        //Données d'un personnages à ajouter ici...
        id: piecesData.id,
        nom: piecesData.nom,
        description: piecesData.description,
        objets:piecesData.objets,
        idObjet:piecesData.objets.id,
        description_objet:piecesData.objets.description,
        livres:piecesData.livres,
        idLivre:piecesData.livres.id,
        titreLivre:piecesData.livres.titre,
        descriptionLivre:piecesData.livres.description,
        extraitLivre:piecesData.livres.extrait
    }
}

module.exports = { halLinkObject, mapPersonnagestoResourceObject , mapPersonnagesListToResourceObject , mapPiecesListToResourceObject , mapPiecestoResourceObject};
