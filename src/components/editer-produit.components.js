import React, { Component } from 'react';
import axios from 'axios';

class EditProd extends Component {



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
 * @property {Function} componentDidMount Permet d'éditer le produit dont l'id est passé en parametre
 * @returns Array<produit>
 */
    componentDidMount() {
        axios.get('http://localhost:4000/produit/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    produit_nom: response.data.produit_nom,
                    produit_marque: response.data.produit_marque,
                    produit_prix: response.data.produit_prix,
                    produit_quantite: response.data.produit_quantite,
                    rupture_stock: response.data.rupture_stock
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
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
     * @property {Function} onChangeProduitStock Se declenche lorqu'on selectionne l'etat d'un produit
     * @param {e} onChangeProduitStock  
     * @returns boolean
     */
    onChangeProduitStock(e) {
        this.setState({
            produit_stock: e.target.value
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
        
       

        
      /**
       * Modification d'un nouveau produit avec les données prechargés
       * Voir {@link new Produit}
       */
    const newProduit = {

            produit_nom: this.state.produit_nom,
            produit_marque: this.state.produit_marque,
            produit_prix: this.state.produit_prix,
            produit_stock: this.state.produit_stock,
            produit_quantite: this.state.produit_quantite,

    }; 

    

        /**
         * @description modifie un produit et affiche la liste des produits
         */
        axios.post('http://localhost:4000/produit/update/'+this.props.match.params.id, newProduit)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

/**
 * @property {Function} render elle examine l'etat local et renvoi le même rendu à chaque fois qu'elle est appelée
 * @returns Le formulaire de modification avec les infos préchargées
 */
    render() {
        return (
            <div style={{backgroundColor: 'white', width: '400px', padding: '10px', margin: '5px auto'}}>
                <h3 align="center">Modifier un produit</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Nom: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.produit_nom}
                                onChange={this.onChangeProduitNom}
                                />
                    </div>
                    <div className="form-group">
                        <label>Marque: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.produit_marque}
                                onChange={this.onChangeProduitMarque}
                                />
                    </div>
                    <div className="form-group">
                        <label>Prix: </label>
                        <input 
                                type="number" 
                                min="0"
                                className="form-control"
                                value={this.state.produit_prix}
                                onChange={this.onChangeProduitPrix}
                                />
                    </div>
                    <div className="form-group">
                        <label>Quantité: </label>
                        <input 
                                type="number" 
                                min="0"
                                className="form-control"
                                value={this.state.produit_quantite}
                                onChange={this.onChangeProduitQuantite}
                                
                                />
                    </div>
                   

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Modifier Produit" onClick={() => window.location.href="http://localhost:3000/"} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
export default EditProd;