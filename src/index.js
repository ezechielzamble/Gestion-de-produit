import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
/* import reportWebVitals from './reportWebVitals'; */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const f= require('../src/components/editer-produit.components');
/**
 * Student name
 * @type {string}
 */
const studentName= 'John Doe';



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/* reportWebVitals();
 */