// Script pour générer une nouvelle clef secrete dans le fichier "private.key"

const crypto = require('crypto')
const fs = require('fs')

//Génère une clef aléatoire de 32 bytes ( char ) en ascii

const secret = crypto.randomBytes(32).toString('hex');

// Enregistrer clef dnas un fichier private.key

fs.writeFileSync('private.key', secret)