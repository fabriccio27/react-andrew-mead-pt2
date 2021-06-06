import React from "react";
import ReactDOM from "react-dom"; 
import {Provider} from "react-redux";
import {startSetExpenses} from "./actions/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter, {history} from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import {login, logout} from "./actions/auth";


import "./firebase/firebase";
import {firebase} from "./firebase/firebase"; //esto es momentaneo para ver si registra que se inicio el procesod de auth
import { LoginPage } from "./components/LoginPage";


const store = configureStore();

/* con Provider, le puedo dar acceso directo al store a los distintos componentes que lo necesiten
connect lo voy a usar en c/componente para poder leer del store o despachar acciones
 */
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
//esto de abajo es para no hacer 2 renders, uno cuando desloguea y otro cuando loguea o al reves. 
//llego a la app. Estoy deslogueado o logueado, pero hasRenderer esta false. Represento la app y cambio a hasRendered=true
/* hago lo que tengo que hacer, y por ejemplo, me deslogueo. Tengo que representar de nuevo? no, y lo controlo preguntando
cual es el state de hasRendered */
let hasRendered = false;
const renderApp = () =>{
    if (!hasRendered){
        ReactDOM.render(jsx, document.querySelector("#app"));
        hasRendered=true;
    }
};

ReactDOM.render(<p>Loading...</p>, document.querySelector("#app"));

//firebase.auth() es para obtener funcionalidades de una instancia parece
//onAuthStateChanged es un event listener, y toma esa callback que se ejecuta cuando el estado de auth cambia
firebase.auth().onAuthStateChanged((user)=>{
    if (user){
        //user.uid se genera para que persona que use el auth provisto por google, y es algo que voy a registrar en el redux store
        //para ver si un visitante puede acceder a ciertas rutas o no
        /* si me logueo, busco mis expenses despachando la accion que arranca setExpenses y ademas
        quiero redirigir si el estado cambio a logueado si estaba en LoginPage (eso checkeo en history.location.pathname) */
        /*que pasa? si yo estoy en la pagina de Edit Expense y hago refresh (F5), es como que remonto app.js
        Va a ver que hay usuario, y, si no especifico que redirija a "/"" solo si estoy en LoginPage, yo que estaba en "/edit/3242",
        voy a terminar en / */
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(()=>{
            renderApp();
            if(history.location.pathname==="/"){
                history.push("/dashboard");
            }
        });
    } else {
        store.dispatch(logout());
        //si cambia a deslogueado, represento la app y mando a / que ahora es LoginPage
        /* necesito renderApp porque antes renderizaba fuera de esta funcion de auth. Si no uso, cuando me deslogueo,
        voy a la pantalla de loading, y despues no sabe que hacer */
        renderApp();
        history.push("/");
    }
});

