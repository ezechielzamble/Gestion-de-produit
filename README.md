
## Liste des Scripts
Dans le dossier du projet, vous pouvez executer

### `npm start`
Demarre le serveur du Back si nous sommes dans le dossier du Back.\
Démarre le serveur du Front si nous sommes dans le dossier du Front
Ouvrir [http://localhost:3000](http://localhost:3000) pour voir l'affichage.


### `npm test`
Lance le gestionnaire de tests dans le mode de veille interactif.\
Commande à executer avant de demarrer le serveur du back

### la première étape est de télécharger le projet

en cliquant sur le bouton *"clone"* vous pouvez cloner le projet ou le télécharger le fichier ZIP

### pour cloner le projet

`git clone https://github.com/ezechielzamble/Gestion-de-produit.git`
`git checkout master`

voilà, vous êtes maintenant sur la bonne branche

## pour lancer le serveur du front

- on commence par installer le gestionnaire des packages de Node
`npm install`

-  pour exécuter le script qui lance le front
 `npm run start`

## pour lancer le serveur du back

il faut se rendre dans le dossier du Back
`cd BackEnt`

- Installez Nodemon, Nodemon surveillera les changements de fichiers et redémarrera le processus NodeJS. Cela permet un développement et des tests plus rapides.
`npm install -g nodemon`

- Assurez vous d'avoir installé mongoDB sur votre poste de travail
dans le cas contraire veuillez installer mongoDB en suivant ce lien
` https://docs.mongodb.com/manual/administration/install-community/ `

- demarrer mongoDB
`mongod`

- L'étape suivante consiste à créer l'instance de la base de données MongoDB. Nous nous connectons donc au serveur de la base de données en utilisant le client MondoDB
`mongo`

- Ensuite, au lieu d'ajouter manuellement les dépendances pour Express, Mongoose et body-parser, utilisez à nouveau npm pour les installer et les ajouter au fichier package.json 
`npm install express mongoose body-parser cors --save`

-  Exécuter le script qui lance le front
 `npm run start`
 
 
