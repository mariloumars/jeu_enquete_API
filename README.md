# API Restfull / Jeu d'enquête

## Sommaire
[Lancer le projet](#lancer-le-projet)
[Jouer](#jouer)
[Accéder une ressource protégée](#accéder-une-ressource-protégée)
[Dictionnaire de données](#dictionnaire-de-données)
[Difficultés rencontrées](#difficultés-rencontrées)
[Références](#références)

### Lancer le projet

Télécharger les packages.
`npm install`

Lancer le projet sur un terminal (gitbash)
`npm run start`

---
Générer la clé sécrete.
`node genkey.js`

### Jouer

` curl localhost:3000`

`curl localhost:3000/personnages`

#### Accéder une ressource protégée

Connectez vous sur la route "login" avec un pseudo et un password que vous trouverez parmis les ressources.

`curl -X POST localhost:3000/login \
-d "pseudo=test&password=test"`

Récupérer la clé JWT, vous pouvez l'enregistrer dans votre terminal.

`jwt=exempledejwt`

Accéder à une ressource avec le jwt.

`curl -X GET localhost:3000/objets \
-H "Authorization: Bearer $jwt"`

### Dictionnaire de données

| ressource   | url          | Méthodes HTTP | Paramètres d’URL/Variations | Commentaires                                                   |
| ----------- | ------------ | ------------- | --------------------------- | -------------------------------------------------------------- |
| personnages | personnages/ | GET           | personnages/{id}            | liste des personnages de l'histoire                            |
| objets      | objets/      | GET           | objets/{id}                 | liste des objets liée à l'histoire que l'enquêteur à récupérer |
| pieces      | pieces/      | GET           | pieces/{id}                 | liste des pieces liée à l'histoire que l'enquêteur à visité    |
| solution    | solution/    | GET           |                             | solution de l'histoire                                         |

### Difficultés rencontrées

J'ai apprécié faire cet exercice, j'aime écrire des histoires mais cela à été compliquer d'allier mon histoires et ses contraintes au codes et à mes limites de compétence.

Je suis contente du résultat et je pense avoir plutôt réussi à atteindre mon objectif.

### Références

https://stackoverflow.com/

https://developer.mozilla.org/

https://www.w3schools.com/

https://www.freecodecamp.org/