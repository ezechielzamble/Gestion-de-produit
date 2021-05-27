const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Produit = new Schema({
    produit_nom: {
        type: String,
        required: [true, 'Entrez un nom']
    },
    produit_marque: {
        type: String,
        required: [true, 'Entrez une marque']
    },
    produit_prix: {
        type: Number,
        required: [true, 'Entrez un prix']

    },
    produit_quantite: {
        type: Number,
        required: [true, 'Entrez une quantité']

    },
    rupture_stock: {
        type: Boolean
    }
});

module.exports = mongoose.model('Produit', Produit);