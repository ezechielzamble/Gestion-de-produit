const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require("mongoose");
const keys = require('../../../server.js');
const app = require('../../../server.js').server;
const conn = require('../../../server.js').server;
const connection = mongoose.connection;
const {ProduitModel} = require("../../../produit.model");
const appl = request('http://localhost:4000');


let postId ="";

// Routes

before(function(done){
    mongoose.connect('mongodb://127.0.0.1:27017/produit', function(){
        connection.db.dropDatabase(function(){
            done();
        })
    } );

})


    describe('requete POST', function(){
        describe("Ajout d'un produit", function(){

            it('OK, ça marche', function() {
                request('http://localhost:4000').post('/produit/add')
                .send({produit_nom: "Iphone 12",
                produit_marque: "Iphone",
                produit_prix: 2250,
                produit_quantite: 6})
                .then((res) => {
                    const body = res.body;
                    expect(body).to.contain.property('_id');
                    expect(body).to.contain.property('produit_nom');
                    expect(body).to.contain.property('produit_marque');
                    expect(body).to.contain.property('produit_prix');
                    expect(body).to.contain.property('produit_quantite');
                    done();
                })
            })
        })
    }

)

describe('requete GET', function(){
    describe("Lister les produits", function(){

        it('OK, ça marche', function() {
            request('http://localhost:4000').get('/produit')
              .then((res) => {
                const body = res.body;
                expect(body.length).to.equal(0);
               done();
            })
            .catch((err) => done(err));
        })
    })
})
/* 
describe('requete PUT', function(){
    
        let produit = null;
before("Trouver un produit", async function(){
    produit = await ProduitModel.findOne({
        produit_nom: "Iphone 12"});
    postId = produit._id;   
})
describe("Modifier un produit", function(){
    let result = null;
    before(async function(){
        result = await appl.put('/produit/update/${postId}')
        .send({
            produit_nom: "Iphone 40",
                produit_marque: "Iphone",
                produit_prix: 2250,
                produit_quantite: 6,
        });
    
    });
    it('OK, ça marche', function(done) {
         const body = res.body;
            expect(result.body).to.equal(true);
           done();
    })
})
})

describe('requete DELETE', function(){
    describe("Supprimer un produit", function(){
        let result = null;
        before(async function(){
            result = await appl.delete('/produit/delete/${postId}')
            console.log("-----Result:", result.body);
        });
        it('OK, ça marche', function(done) {((res) => {
                const body = res.body;
                expect(body.length).to.equal(0);
               
            })
           
        })
    })
}) */
