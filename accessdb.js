var bcrypt = require('bcrypt')

class Peoples {

    constructor(id, nom, code, isDirector) {
        this.id = id;                    // Identifiant unique pour chaque personnes avec acces
        this.nom = nom;             // Nom de la personnes qui posède un acces
        this.code = code           // Code d'acces 
        this.isDirector = isDirector;        // Booleen d'acces a la réserve de la bibliothèque
    }
}

const peoples = [
  new Peoples(1, 'nattla',"9898", false),
  new Peoples(2, 'terrios',"7653", true),
];

module.exports = {Peoples, peoples}