import React, { Component } from "react" ;
import { BrowserRouter as Router, Route, Link } from "react-router-dom" ;
import "bootstrap/dist/css/bootstrap.min.css" ;
import logo from "./logo.svg";
import EditProd from "./components/editer-produit.components";
import CreateProd from "./components/créer-produit.component";
import ProdList from "./components/liste-produits.component";

class App extends Component {
  render(){
     return (
       <Router>
    <div className="container" >

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="/">Gestion de produit</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/">Liste des produits <span class="sr-only"></span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/create">Créer un produit</a>
      </li>
      
    </ul>
  </div>

</nav>


     <br/>
     <Route path="/" exact component={ProdList} />
    <Route path="/edit/:id" component={EditProd} />
    <Route path="/create" component={CreateProd} />
    </div>
  
      </Router>
  );
  }
 
}
export default App;