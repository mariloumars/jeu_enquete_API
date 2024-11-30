var bcrypt = require('bcrypt')

class User {

    constructor(id, pseudo, password, isAutorized, isDetective, isSoluce) {
        this.id = id;                 
        this.pseudo = pseudo;             
        this.password = bcrypt.hashSync(password,1);           // Code d'acces 
        this.isAutorized = isAutorized;          // Status déterminant l'acces a la ressources pieces
        this.isDetective = isDetective;         // Status déterminant l'acces a la ressources objets
        this.isSoluce = isSoluce;           // Status déterminant l'acces a la ressources solution
    }
}

const users = [
  new User(1, 'nattla',"9876", false, true, false),
  new User(2, 'terrios',"7653", true, true, false),
  new User(3, 'mona',"diplont", true, true, true),
  new User(4, 'test',"1111", false, false, false),
];

module.exports = { users, User}