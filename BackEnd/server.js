const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const produitRoutes = express.Router();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
/* const swaggerDocument = require('../swagger');
 */
const PORT = 4000;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "API Gestion des produits",
        description: "Documentation des requetes",
        contact: {
          name: "Ezechiel Zamble"
        },
        servers: ["http://localhost:4001"]
      }
    },
    // ['.routes/*.js']
    apis: ["server.js"]
  };



let Produit = require('./produit.model');
const { count } = require('./produit.model');
nombre = 0;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/produit', {useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB connecté");
})


// Routes
/**
 * @swagger
 * /produits:
 *  get:
 *    description: Utilisé pour afficher tous les produits
 *    responses:
 *      '200':
 *        description: Ok, ça marche !
 */
produitRoutes.route('/').get(function(req, res) {
    Produit.find(function(err, produits) {
        if (err) {
            console.log(err);
        } else {
            nombre = produits.length;
            //produits.push("nombre", nombre);
            res.json(produits);
        }
    });
});

/**
 * @swagger
 * /produit/{id}:
 *  get:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *           type: integer
 *        required: true
 *    description: Utilisé pour afficher un produit par son id
 *    responses:
 *      '200':
 *        description: Ok, ça marche !
 */
produitRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Produit.findById(id, function(err, produit) {
        res.json(produit);
    });
});



/**
 * @swagger
 * /produit/add:
 *  post:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *           type: integer
 *        required: true
 *    description: Utilisé pour ajouter un produit
 *    responses:
 *      '200':
 *        description: Ok, ça marche !
 */
produitRoutes.route('/add').post(function(req, res) {
    let produit = new Produit(req.body);
    produit.save()
        .then(produit => {
            res.status(200).json({'produit': 'produit ajouté avec succès'});
        })
        .catch(err => {
            res.status(400).send('Erreur lors de creation de nouveau produit');
        });
});

/**
 * @swagger
 * /produit/{id}:
 *  put:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *           type: integer
 *        required: true
 *    description: Utilisé pour modifier un produit
 *    responses:
 *      '200':
 *        description: Ok, ça marche !
 */
produitRoutes.route('/update/:id').post(function(req, res) {
    Produit.findById(req.params.id, function(err, produit) {
        if (!produit)
            res.status(404).send("Aucune données trouvée");
        else
            produit.produit_nom = req.body.produit_nom;
            produit.produit_marque = req.body.produit_marque;
            produit.produit_prix = req.body.produit_prix;
            produit.produit_quantite = req.body.produit_quantite;

            produit.save().then(produit => {
                res.json('Produit à jour !');
            })
            .catch(err => {
                res.status(400).send("Modification impossible");
            });
    });
});

/**
 * @swagger
 * /produit/delete/{id}:
 *  delete:
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *           type: integer
 *        required: true
 *    description: Utilisé pour supprimer un produit
 *    responses:
 *      '200':
 *        description: Ok, ça marche !
 */
produitRoutes.route('/delete/:id').delete(function(req, res) {
    Produit.remove({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });


app.use('/produit', produitRoutes);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, function() {
    console.log("Serveur en fonction sur : " + PORT);
    
});
