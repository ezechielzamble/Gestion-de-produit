import React, {Component} from 'react';
/* import { Link } from 'react-router-dom';
 */
import "bootstrap/dist/css/bootstrap.min.css" ;
import axios from 'axios';
import Swal from 'sweetalert2';
/* import { remove } from '../../BackEnd/produit.model';
 *//* import { deleteOne } from '../../src/components/liste-produits.component';
 */


const Produit = props => {

        
   return (
        <tr>
            <td className={props.produit.rupture_stock ? 'completed' : ''}>{props.produit.produit_nom}</td>
            <td className={props.produit.rupture_stock ? 'completed' : ''}>{props.produit.produit_marque}</td>
            <td className={props.produit.rupture_stock ? 'completed' : ''}>{props.produit.produit_prix}</td>
            <td className={props.produit.rupture_stock ? 'completed' : ''}>{props.produit.produit_quantite}</td>
            <td >{props.produit.produit_quantite<= 0?<a className="btn btn-danger" aria-disabled="true">Indisponible</a>:<a className="btn btn-success" aria-disabled="true"> Disponible</a>}</td>
            <td>
          <a className="btn btn-warning" href={"/edit/"+props.produit._id}><i className="fas fa-edit"></i>Modifier</a>
          &nbsp;
          <a className="btn btn-danger" onClick={() => props?.delete(props.produit._id)}><i className="far fa-times-circle"></i>Supprimer</a>
      </td>
        </tr>
    
    )

}

class ProdList extends Component{
    
    constructor(props) {
        super(props);
        this.state = {produit: []};
        this.remove=this.remove.bind(this);
        this.deleteOne=this.deleteOne.bind(this);

    }

 /**
 * @property {Function} componentDidMount affiche tous les produits
 * @returns Array<produit>
 */
    componentDidMount() {
        axios.get('http://localhost:4000/produit/')
            .then(response => {
                this.setState({ produit: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    /**
     * @property {Function} remove retire un produit de la liste des produits
     * @param {id} id indentifiant designant un produit 
     */
    remove(id){
        this.setState({
            produit: this.state.produit.filter(prod=>prod._id!==id)
        })
    }
       
    /**
     * @property {Function} deleteOne supprime un produit au travers son indentifiant
     * @param {id} identifiant l'identifiant du produit à supprimer 
     */
     deleteOne(id) {
         console.log('id',id);

         Swal.fire({
            title: 'Voulez vous supprimer ce produit ?',
            text: 'Ce produit sera effacer de la liste des produits',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, Supprimer',
            cancelButtonText: 'Non, Annuler'
          }).then((result) => {
            if (result.isConfirmed) {
            axios.delete('http://localhost:4000/produit/delete/'+id).then(res => {
                
            console.log(res.data); 
                this.remove(id)
            });
              Swal.fire(
                'Supprimer',
                'Produit supprimé',
                'Valider'
              )
           
                
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Annuler',
                'Aucun produit supprimé',
                'erreur'
              )
            }
          })

          
          };

        /**
         * @property {Function} filterContent filtre la liste des produits en se basant sur le texte saisi
         * @param {produit}  Produit
         * @param {searchTerm} searchTerm 
         */
            filterContent(produit, searchTerm){
                const result = this.state.produit.filter((produit) => 
                     produit.produit_nom.toLowerCase().includes(searchTerm.toLowerCase())||
                     produit.produit_marque.toLowerCase().includes(searchTerm.toLowerCase())
                     

                    );

                this.setState({ produit: result });
            }
              
     /**
     * @property {Function} handleTextSearch Se declenche lorqu'on fait une recherche
     * @param {e} event intervient lorsqu'un événement est déclenché (saisie dans la barre de recherche)
     * @returns Array
     */
            handleTextSearch = (e)=>{
                const searchTerm = e.currentTarget.value;
                if (searchTerm =='') {
                    window.location.href="http://localhost:3000/";
                }
                axios.get('http://localhost:4000/produit/').then(response => {
               this.filterContent(this.produit, searchTerm)
            })
            
       }; 

    render(){
        return(
            <div className="container">

                
                <div className="row">
                    <div className="col-lg-9 mt-2 mb2">
                        <h3>Liste des produits</h3>
                    </div>
                    <div className="col-lg-3 mt-2 mb2">
                        <input className="form-control" type="search" placeholder="rechercher un produit" name="searchTerm" onChange={this.handleTextSearch}></input>
                    </div>
                </div>

<table class="table">
  <thead>
    <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Marque</th>
                            <th scope="col">Prix (€)</th>
                            <th scope="col">Quantité</th>
                            <th scope="col">Disponibilité</th>
                            
                            <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>

  { this.state.produit.map((currentProduit, i)=>{
     
                            return (
                                <Produit  delete={() => {this.deleteOne(currentProduit._id)} } produit={currentProduit} key={i}  />
                                
                            )}) }
     
  
  </tbody>
</table>


            </div>
        )
    }
} 
export default ProdList;