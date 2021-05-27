import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

class CreateProd extends Component {
   
     /**
     * Constructeur permettant d'editer un produit
     * @param {props} Constructeur  recupère les valeurs de saisis, les enregistre et initialise l'etat local
     */
    constructor(props) {
        super(props);

        this.onChangeProduitNom = this.onChangeProduitNom.bind(this);
        this.onChangeProduitMarque = this.onChangeProduitMarque.bind(this);
        this.onChangeProduitPrix = this.onChangeProduitPrix.bind(this);
        this.onChangeProduitQuantite = this.onChangeProduitQuantite.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            produit_nom: '',
            produit_marque: '',
            produit_prix: '',
            produit_quantite: '',
            rupture_stock: false
        }
    }

     /**
     * @property {Function} onChangeProduitNom Se declenche lorqu'on saisi le nom d'un produit
     * @param {Event} e événement
     * @returns String
     */
    onChangeProduitNom(e) {
        this.setState({
            produit_nom: e.target.value
        });
    }

     /**
     * @property {Function} onChangeProduitMarque Se declenche lorqu'on saisi la marque d'un produit
     * @param {e} onChangeProduitMarque  
     * @returns String
     */
    onChangeProduitMarque(e) {
        this.setState({
            produit_marque: e.target.value
        });
    }

      /**
     * @property {Function} onChangeProduitPrix Se declenche lorqu'on saisi le prix d'un produit
     * @param {e} onChangeProduitPrix  
     * @returns number
     */
    onChangeProduitPrix(e) {
        this.setState({
            produit_prix: e.target.value
        });
    }

      /**
     * @property {Function} onChangeProduitQuantite Se declenche lorqu'on saisi la quantité d'un produit
     * @param {e} onChangeProduitQuantite  
     * @returns number
     */
    onChangeProduitQuantite(e) {
        this.setState({
            produit_quantite: e.target.value
        });
    }

    /**
     * @property {Function} onSubmit Se declenche que lorque l'evenement est traité 
     * @param {e} onSubmit   
     */
    onSubmit(e) {
        e.preventDefault();
        Swal.fire('Produit ajouté !')
       /*  console.log(`Form submitted:`);
        console.log(`Produit Nom: ${this.state.produit_nom}`);
        console.log(`Produit Marque: ${this.state.produit_marque}`);
        console.log(`Produit Prix: ${this.state.produit_prix}`);
        console.log(`Produit Quantite: ${this.state.produit_quantite}`); */

    const newProduit = {

            produit_nom: this.state.produit_nom,
            produit_marque: this.state.produit_marque,
            produit_prix: this.state.produit_prix,
            produit_quantite: this.state.produit_quantite,
            rupture_stock: this.state.rupture_stock

    }; 

         axios.post('http://localhost:4000/produit/add', newProduit)
            .then(res => console.log(res.data));

        this.setState({
            produit_nom: '',
            produit_marque: '',
            produit_prix: '',
            produit_quantite: '',
            rupture_stock: false
        }) 
    }

    render() {
        return (
            <div style={{backgroundColor: 'white', width: '400px', padding: '10px', margin: '5px auto'}}>
                <h3>Créer un nouveau Produit</h3>
                <form onSubmit={this.onSubmit} >
                    <div className="form-group"> 
                        <label>Nom : </label>
                        <input type="text"
                        placeholder="ex: Eau Minérale"
                                className="form-control"
                                value={this.state.produit_nom.toLowerCase()}
                                onChange={this.onChangeProduitNom}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label>Marque : </label>
                        <input 
                                type="text" 
                                placeholder="ex: Celeste"
                                className="form-control"
                                value={this.state.produit_marque.toUpperCase()}
                                onChange={this.onChangeProduitMarque}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label>Prix : </label>
                        <input 
                                type="number" 
                                min="0"
                                placeholder="ex: 15 €"
                                className="form-control"
                                value={this.state.produit_prix}
                                onChange={this.onChangeProduitPrix}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label>Quantité : </label>
                        <input 
                                type="number" 
                                min="0"
                                placeholder="ex: 10"
                                className="form-control"
                                value={this.state.produit_quantite}
                                onChange={this.onChangeProduitQuantite}
                                required
                                />
                    </div>
                   
<br/>
                    <div className="form-group">
                        <input type="submit" value="Créer produit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateProd;       
   