var bcrypt = require('bcrypt')

class User {

    constructor(id, nom, password, isAutorized) {
        this.id = id;                    // Identifiant unique pour chaque utilisateur
        this.nom = nom;             // Nom avec onomatopée "baka uWu"
        this.password = bcrypt.hashSync(password,1);           // Mot de passe de l'utilisateur
        this.isAutorized = isAutorized;           // Statut d'admin utilisant les valeurs de l'énumérateur AdminStatus
    }
}

const users = [
  new User(1, 'nattla',"9898", false),
  new User(2, 'terrios',"7653", true)
];

module.exports = { users, User}